import { downloadImages } from '../src/downloadImages.mjs';
import { findImgurLinks} from '../src/findImgurLinks.mjs' 
import { findMissingImages, writeListToFile, deduplicateArray } from '../src/helpers.mjs';

// const res = deduplicateArray(['abc', 'ab', 'abc'])
// console.log(res)


downloadImages(['badlink', 'https://i.imgur.com/111111.png','https://i.imgur.com/Y4IULrC.png' ])
// findImgurLinks('../../')
//   .then(links => console.log('Found links:', links))
//   .catch(err => console.error('Error:', err));


// findImgurLinks('../../')
//   .then(links => console.log('Found links:', links))
//   .catch(err => console.error('Error:', err));