import { S3Client, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import { listImagesInS3, uploadImagesToS3 } from '../src/s3Utils.mjs';
import dotenv from 'dotenv';

dotenv.config();
// currently broken and ignored in jest.config... but we also hae the s3Utils-actual (integration test) that actually does operations to S3
jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn()
      };
    }),
    ListObjectsV2Command: jest.fn(),
    PutObjectCommand: jest.fn()
  };
});

describe('listImagesInS3 - mock', () => {
  const existingImages = ['Y4IULrC.png'];

  beforeEach(() => {
    S3Client.prototype.send.mockClear();
  });

  test('lists images in S3 bucket - mock', async () => {
    S3Client.prototype.send.mockResolvedValue({ Contents: [{ Key: 'Y4IULrC.png' }] });

    const images = await listImagesInS3();
    expect(images).toEqual(existingImages);
  });
});

describe('uploadImagesToS3 - mock', () => {
  const imagesToUpload = [{ key: 'X5JUd6b.jpg', buffer: Buffer.from('fake-image-data') }];

  beforeEach(() => {
    S3Client.prototype.send.mockClear();
  });

  test('uploads images to S3 - mock', async () => {
    S3Client.prototype.send.mockResolvedValue(true);

    await uploadImagesToS3(imagesToUpload);

    expect(S3Client.prototype.send).toHaveBeenCalledTimes(imagesToUpload.length);
    imagesToUpload.forEach(image => {
      expect(PutObjectCommand).toHaveBeenCalledWith({
        Bucket: process.env.BUCKET_NAME,
        Key: image.key,
        Body: image.buffer
      });
    });
  });
});
