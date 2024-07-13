import { findImgurLinks } from './findImgurLinks.mjs';
import { listImagesInS3, uploadImagesToS3 } from './s3Utils.mjs';
import { findMissingImages, writeListToFile, deduplicateArray } from './helpers.mjs';
import { downloadImages } from './downloadImages.mjs';
import { S3Client} from '@aws-sdk/client-s3';
import path from 'path'
import dotenv from 'dotenv';




async function main() {

  //Ensure you load the env correctly if you run differently, (e.g. rather than npm run start you cd to src then run node index.mjs) 
  //const envPath = path.resolve(process.cwd(), '..' ,'.env')
  const envRes = dotenv.config();
  if(!process.env.BUCKET_NAME){
    console.log('env not loaded')
    console.log(envRes)
    return false
  }
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const s3Client = new S3Client({
    region: process.env.AWS_REGION, credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });

  try {
    // Find Imgur links in local files
    const dir = `C:\\Users\\trone\\Documents\\git_repos\\trones-noters\\docusaurus`//replace with the abosulute or relative directory you want to search
    const imgurLinks = await findImgurLinks(`${dir.replace(/\\/g, '/')}/**/*.*`); //update the pattern to include only specific files, see https://www.npmjs.com/package/glob
    console.log('Found Imgur links:', imgurLinks);

    const uniqueImgurLinks = deduplicateArray(imgurLinks)

    // List images already in S3
    const s3Images = await listImagesInS3(s3Client, BUCKET_NAME);
    console.log('Images in S3:', s3Images);

    // Find missing images
    const missingImages = findMissingImages(uniqueImgurLinks, s3Images);
    console.log('Missing images:', missingImages);

    // Download missing images
    const {images, badLinks} = await downloadImages(missingImages);
    if(badLinks.length !== 0){
      writeListToFile(badLinks, 'failedToGetFromImgurl.txt');
      console.log('List of badlinks written to disk');
    }
    console.log('Downloaded images:', images.map(i => i.key));

    // Upload downloaded images to S3
    //ToDo: log any failures 
    await uploadImagesToS3(s3Client, BUCKET_NAME, images);
    console.log('Uploaded images to S3');

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();