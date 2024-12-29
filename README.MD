# Imgur Link Processor

This Node.js tool searches for Imgur image links in files within a directory, identifies which images are not already uploaded to an AWS S3 bucket, downloads those images, and uploads them to the S3 bucket.

# Background
I take all my screenshots with Greenshot and put these links directly in my Markdown files for my markdown based main portfolio/blog site. I developed this little tool due to the concern that if imgurl ever removes these photos then I'd lose them forever. By backing these images up to s3 I can just replace the links and even optimize them as well (webp/avif) 

## Features

- Recursively searches through all files in a specified directory for Imgur image links.
- Retrieves a list of images already stored in the specified S3 bucket.
- Identifies which Imgur images are not present in the S3 bucket.
- Downloads the missing images from Imgur.
- Uploads the downloaded images to the S3 bucket.

## Prerequisites

- Node.js installed on your machine.
- AWS account with S3 permissions.
- AWS SDK configured with your access key and secret key.
- An S3 bucket to store the images.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Trones21/ImgurToS3.git
    cd ImgurToS3
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add your AWS credentials and configuration:
    ```env
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    AWS_REGION=your-region
    BUCKET_NAME=your-bucket-name
    ```

## Usage

1. Run the tool:
    ```sh
    npm start
    ```

2. The tool will:
    - Search for Imgur links in the files within the specified directory.
    - Retrieve the list of images already in the S3 bucket.
    - Identify which Imgur images are missing from the S3 bucket.
    - Download the missing images from Imgur.
    - Upload the missing images to the S3 bucket.
    - Write a list of "bad links" to ```./failedToGetFromImgurl.txt```

- This does not currently check for the success of the uploads to S3.. but you could always just run it again (and since it does a diff you will know if any failed) 

**Note: Check out the regex (that matches links) & the glob pattern(for matching files), you may need/want to modify these to support your use case. My links are all wrapped in (), so the Regex is currently setup to do that (also I didn't put any time into making it very robust, it works for me as it is)**

## Example

```sh
npm start
```

After running the script, you should see output similar to:

```
Found Imgur links: [
  'https://i.imgur.com/123.png',
  'https://i.imgur.com/456.png',
  'https://i.imgur.com/foo.png',
]
Images in S3: [
  '123.png', '456.png',
]
Missing images: ['foo.png',]
Downloaded images: ['foo.png',]
Uploaded images to S3
```

## Tests

```sh
npm test
```

Test your AWS login: 
```sh
npx jest tests/apiCalls/awsLogin.test.js
```


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
- Fork the repository.
- Create your feature branch (git checkout -b feature/fooBar).
- Commit your changes (git commit -am 'Add some fooBar').
- Push to the branch (git push origin feature/fooBar).
- Create a new Pull Request.

## Issues
If you encounter any issues, please feel free to open an issue on the GitHub repository.

## Contact
For questions, suggestions, or feedback, please contact [imgurtos3@gmailisprofessional.com](mailto:imgurtos3@gmailisprofessional.com)
