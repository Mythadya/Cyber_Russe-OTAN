# Script de préparation (lancé une seule fois) : extrait l'Europe du fichier Natural Earth,
# rattache la Crimée à l'Ukraine, simplifie les tracés et génère data/pays.js.
# Prérequis : pip install shapely  +  ne_50m_admin_0_countries.geojson dans le dossier courant.
import json
from shapely.geometry import shape, Point, mapping, MultiPolygon, Polygon
from shapely.ops import unary_union
d=json.load(open('ne_50m_admin_0_countries.geojson'))
KEEP_EXTRA={'TUR','GEO','ARM','AZE','KAZ','CYP','MAR','DZA','TUN','LBY','EGY','SYR','IRQ','IRN','ISR','LBN','JOR','PSX','TKM','UZB','MNG','CHN','KGZ','SAU','PRK','JPN','KOR','ISL','GRL','PSE'}
feats={}
for f in d['features']:
    p=f['properties']; a3=p['ADM0_A3']
    if p['CONTINENT']=='Europe' or a3 in KEEP_EXTRA:
        feats[a3]={'name':p.get('NAME_FR') or p['NAME'],'iso':a3,'geom':shape(f['geometry']),'europe':p['CONTINENT']=='Europe' or a3 in ('TUR','GEO','ARM','AZE','CYP')}
# Crimée -> Ukraine
rus=feats['RUS']['geom']; pt=Point(34.1,45.0)
polys=list(rus.geoms)
crimea=[g for g in polys if g.contains(pt)]
print('crimea poly area',[c.area for c in crimea], 'n polys', len(polys))
from shapely.geometry import box
cr_zone=box(32.4,44.3,36.7,46.3)
move=[g for g in polys if g.representative_point().within(cr_zone)]
print('moving',len(move),[round(g.area,3) for g in move])
feats['RUS']['geom']=MultiPolygon([g for g in polys if g not in move])
feats['UKR']['geom']=unary_union([feats['UKR']['geom']]+move)
out=[]
for a3,f in feats.items():
    g=f['geom'].simplify(0.03 if a3 in ('RUS','CHN','KAZ','MNG','GRL') else 0.015, preserve_topology=True)
    gj=mapping(g)
    def rnd(c):
        if isinstance(c,(list,tuple)) and c and isinstance(c[0],(int,float)): return [round(c[0],2),round(c[1],2)]
        return [rnd(x) for x in c]
    out.append({'type':'Feature','properties':{'name':f['name'],'iso':a3,'europe':f['europe']},'geometry':{'type':gj['type'],'coordinates':rnd(gj['coordinates'])}})
fc={'type':'FeatureCollection','features':out}
import os; os.makedirs('../data',exist_ok=True)
open('../data/pays.js','w').write('// Frontières des pays (source : Natural Earth 1:50m, domaine public).\n// La Crimée est rattachée à l\'Ukraine, conformément au droit international.\nconst PAYS_GEOJSON = '+json.dumps(fc,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(out), os.path.getsize('../data/pays.js')//1024,'KB')
print(sorted((f['properties']['iso'],f['properties']['name']) for f in out if f['properties']['europe']))
