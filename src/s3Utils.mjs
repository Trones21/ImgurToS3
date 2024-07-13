import { S3Client, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';

export async function listImagesInS3(s3Client, bucketName) {
  try {
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const { Contents } = await s3Client.send(command);
    if (Contents) {
      return Contents.map(item => item.Key);
    }
    return [];
  } catch (error) {
    console.error('S3 List Images Error:', error.name, error.message);
    throw new Error('S3ListImagesError');
  }
}


export async function uploadImagesToS3(s3Client, bucketName, images) {
  try {
    const uploads = images.map(async image => {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: image.key,
        Body: image.buffer,
      });
      await s3Client.send(command);
    });
    await Promise.all(uploads);
    return true;
  } catch (error) {
    console.error('S3 Upload Image Error:', error.name, error.message);
    throw new Error('S3UploadImageError');
  }
}



