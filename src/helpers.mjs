import fs from 'fs'

const writeListToFile = (list, filename) => {
  fs.writeFileSync(filename, list.join("\n"), "utf8");
}

const findMissingImages = (imgurLinks, s3Images) => {
  const s3ImageKeys = new Set(s3Images);
  const links = imgurLinks.filter((link) => !s3ImageKeys.has(link.split("/").pop()));
  return links;
}

const deduplicateArray = (arr, key) => {
  const seen = new Set();
  for (let item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
    }
  }
  const out = Array.from(seen)
  return out;
}

export { writeListToFile, findMissingImages, deduplicateArray };
