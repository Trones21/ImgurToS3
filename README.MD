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
    git clone <tbd>
    cd imgur-link-processor
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
    npm run start
    ```

2. The tool will:
    - Search for Imgur links in the files within the specified directory.
    - Write the list of found Imgur links to `imgur_links.txt`.
    - Retrieve the list of images already in the S3 bucket.
    - Identify which Imgur images are missing from the S3 bucket.
    - Download the missing images from Imgur.
    - Upload the missing images to the S3 bucket.

## Example

```sh
npm run start
```

After running the script, you should see output similar to:

```
Imgur links written to imgur_links.txt
Fetched existing images from S3
Found missing images
Downloaded missing images
Uploaded missing images to S3
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

