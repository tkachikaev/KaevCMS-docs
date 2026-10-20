// Build-time image manifest generator. Downloads metadata, never image binaries.
import {readFile,writeFile,mkdir} from 'node:fs/promises'
import {join,dirname,resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
const root=resolve(fileURLToPath(new URL('..',import.meta.url)))
const output=join(root,'docs/public/data/image-catalog.json')
const API='https://api.github.com/repos/tkachikaev/KaevCMS-image'
async function get(path){
 const token=process.env.GITHUB_TOKEN || process.env.GH_TOKEN
 const response=await fetch(API+path,{
   headers:{Accept:'application/vnd.github+json','User-Agent':'KaevCMS-docs-image-catalog',...(token?{Authorization:'Bearer '+token}:{})},
   signal:AbortSignal.timeout(25000)
 })
 if(!response.ok)throw new Error('GitHub API '+response.status+' while requesting '+path)
 return response.json()
}
async function run(){
 try{
  const [tree,ref]=await Promise.all([get('/git/trees/main?recursive=1'),get('/git/ref/heads/main')])
  if(tree.truncated)throw new Error('Image repository tree is truncated')
  const entries=tree.tree.filter(f=>f.type==='blob'&&f.path.endsWith('.webp')).map(f=>{
    let cat=-1
    if(f.path.startsWith('public/uploads/game-assets/characters/common/'))cat=0
    else if(f.path.startsWith('public/uploads/account-avatars/'))cat=1
    else if(f.path.startsWith('public/uploads/game-assets/items/common/'))cat=2
    return cat<0?null:[cat,f.path.replace(/^public\\/uploads\\//,''),f.size||0]
  }).filter(Boolean)
  if(!entries.length)throw new Error('No image assets found')
  const content=JSON.stringify({commit:ref.object.sha,entries})
  await mkdir(dirname(output),{recursive:true})
  let old
  try{old=await readFile(output,'utf8')}catch{}
  if(old!==content)await writeFile(output,content,'utf8')
  console.log('Image catalog: '+entries.length+' assets, source '+ref.object.sha.slice(0,12))
 }catch(err){
   try{const cached=JSON.parse(await readFile(output,'utf8'))
     if(!cached.entries?.length)throw new Error('Empty cached image catalog')
     console.warn('Using previous image manifest:',err.message)
   }catch{throw err}
 }
}
run().catch(err=>{console.error(err);process.exitCode=1})
