const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

describe('AWS Login', () => {
  test('should be able to login and list S3 buckets', async () => {
    const s3Client = new S3Client({ region: process.env.AWS_REGION });

    try {
      const data = await s3Client.send(new ListBucketsCommand({}));
      expect(data.Buckets).toBeDefined();
      console.log('First S3 Bucket:', data.Buckets[0]);
    } catch (error) {
      console.error('Error:', error);
      throw new Error('AWS login test failed');
    }
  });
});
