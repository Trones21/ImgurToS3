import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { listImagesInS3, uploadImagesToS3 } from '../../src/s3Utils.mjs';

// Load environment variables from .env file
dotenv.config();

// Create an S3 client using environment variables
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Test data
const imagesToUpload = [
  { key: 'test-image1.jpg', buffer: Buffer.from('This is a test image content 1') },
  { key: 'test-image2.jpg', buffer: Buffer.from('This is a test image content 2') }
];

// Integration tests
describe('S3 Integration Tests', () => {
  test('handles empty bucket', async () => {
    const bucketName = process.env.EMPTY_BUCKET_NAME; // Ensure this bucket exists and is empty
    console.log('bucketName', bucketName)
    const images = await listImagesInS3(s3Client, bucketName);
    console.log('Images in empty bucket:', images);
    expect(images).toEqual([]);
  });

  test('handles actual error', async () => {
    const bucketName = 'non-existent-bucket';
    await expect(listImagesInS3(s3Client, bucketName)).rejects.toThrow('S3ListImagesError');
  });

 
  test('uploads images to S3 and verifies upload', async () => {
    // Upload images
    await uploadImagesToS3(s3Client, process.env.BUCKET_NAME, imagesToUpload);

    // List images to verify upload
    const images = await listImagesInS3(s3Client, process.env.BUCKET_NAME);
    console.log('Images in S3 after upload:', images);
    
    // Verify each image was uploaded
    imagesToUpload.forEach(image => {
      expect(images).toContain(image.key);
    });

    // Clean up: remove the test images from S3 (optional)
    const deleteCommands = imagesToUpload.map(image => ({
      Bucket: process.env.BUCKET_NAME,
      Key: image.key,
    }));
    await Promise.all(deleteCommands.map(command => s3Client.send(new DeleteObjectCommand(command))));
  });
});
