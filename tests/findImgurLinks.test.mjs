import { findImgurLinks } from "../src/findImgurLinks.mjs";

describe("findImgurLinks", () => {
  test("finds Imgur links in files - absolute path", async () => {
    const dir = `C:\\Users\\trone\\Documents\\git_repos\\trones-noters\\tools\\`
    const links = await findImgurLinks( `${dir}/**/*.*`);
    expect(links).toEqual(
      expect.arrayContaining([
        "https://i.imgur.com/73d9Wii.png",
        "https://i.imgur.com/Y4IULrC.png",
        "https://i.imgur.com/111111.png",
        "https://i.imgur.com/333333.png",
      ])
    );
  }, 20000);
  test("finds Imgur links in files - relative path", async () => {
    const dir = `../../`
    const links = await findImgurLinks( `${dir}/**/*.*`);
    expect(links).toEqual(
      expect.arrayContaining([
        "https://i.imgur.com/73d9Wii.png",
        "https://i.imgur.com/Y4IULrC.png",
        "https://i.imgur.com/111111.png",
        "https://i.imgur.com/333333.png",
      ])
    );
  }, 20000);
});
