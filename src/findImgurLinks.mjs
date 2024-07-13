import fs from 'fs';
import { glob } from 'glob';

export async function findImgurLinks(pattern) {
    let files = await glob.glob(pattern, { ignore: '**/node_modules/**' })
    if(files.length === 0){
      console.error("Pattern did not match any files")
      return []
    }
    //glob not doing well with the pattern
    files = files.filter(f => !f.includes('node_modules'))
    const links = files.flatMap(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.match(/https:\/\/i\.imgur\.com\/[^\s)]+/g);
        return matches || [];
      } catch (readErr) {
        console.error(`Error reading file ${file}:`, readErr);
        return [];
      }
    }); 
    return links;
}
