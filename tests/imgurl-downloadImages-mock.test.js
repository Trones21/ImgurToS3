const axios = require('axios');
const { downloadImages } = require('../src/downloadImages');

jest.mock('axios');

describe('downloadImages', () => {
  const sampleLink = 'https://i.imgur.com/X5JUd6b.jpg';

  test('downloads missing images', async () => {
    axios.mockImplementation((options) => {
      if (options.url === sampleLink) {
        return Promise.resolve({ data: Buffer.from('fake-image-data') });
      }
      return Promise.reject(new Error('Image not found'));
    });

    const downloadedImages = await downloadImages([sampleLink]);
    expect(downloadedImages).toEqual([{ key: 'X5JUd6b.jpg', buffer: Buffer.from('fake-image-data') }]);
  });
});

