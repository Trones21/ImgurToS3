import axios from 'axios'

export async function downloadImages(links) {
    const out = {
        images: [],
        badLinks: []
    }
    for(let link of links){
        try{
        const res = await axios({ url: link, responseType: 'arraybuffer' });
        if (res.status < 200 || res.status > 299) {
            console.warn('Bad response Status: '+ res.status, " link: " + link)
            out.badLinks.push(link)
            continue;
        }

        if(res.data.toString().includes('<!doctype html>')){
            console.warn('Invalid Link, html response instead of image, link: ', link)
            out.badLinks.push(link)
            continue;
        }
        
        out.images.push({key: link.split('/').pop(), buffer: Buffer.from(res.data)})

        }catch(Error){
            console.warn("'Error getting link: ", link)
            out.badLinks.push(link)
        }
    }
    return out;

    }
    

