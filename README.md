# Serverless application to notify about new submitted data

This is simple "Contact Us" application contains static frontend part (Vuejs + Bulma) and API to procced data and send notification about new requests.
API endpoint build with AWS API Gateway and AWS Lambda. Static site hosted on AWS S3. Notifications are pushed to AWS SNS.

## Requirements

1. [AWS CLI](https://docs.aws.amazon.com/cli/index.html)
2. [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
3.  npm

## How to deploy

1. Create S3 bucket for static site `aws s3 mb s3://[your_bucket_for_static]`
2. Update your bucket name in package.json
3. Enable static website hosting for your S3 bucket
4. Update your bucket URL in template.yml (Cors section)
5. Create S3 bucket to store SAM package `aws s3 mb s3://[your_bucket_for_package]`
6. Update your bucket name in package.json
7. Deploy SAM template `npm run deploy`
8. Get upir API endpoint `npm run endpoint`
9. Update this value in .static/config.js
10. Upload static site to S3 `npm run static`
