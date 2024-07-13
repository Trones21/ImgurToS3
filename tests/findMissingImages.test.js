const { findMissingImages } = require('../src/helpers');

describe('findMissingImages', () => {
  const sampleLinks = [
    'https://i.imgur.com/Y4IULrC.png',
    'https://i.imgur.com/X5JUd6b.jpg'
  ];

  const existingImages = [
    'Y4IULrC.png'
  ];

  test('finds missing images', () => {
    const missingImages = findMissingImages(sampleLinks, existingImages);
    expect(missingImages).toEqual(['https://i.imgur.com/X5JUd6b.jpg']);
  });
});
