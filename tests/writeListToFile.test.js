const fs = require('fs');
const { writeListToFile } = require('../src/helpers');

jest.mock('fs');

describe('writeListToFile', () => {
  const sampleLinks = [
    'https://i.imgur.com/Y4IULrC.png',
    'https://i.imgur.com/X5JUd6b.jpg'
  ];

  test('writes list of links to a file', () => {
    const filename = 'imgur_links.txt';
    fs.writeFileSync = jest.fn();

    writeListToFile(sampleLinks, filename);
    expect(fs.writeFileSync).toHaveBeenCalledWith(filename, sampleLinks.join('\n'), 'utf8');
  });
});
