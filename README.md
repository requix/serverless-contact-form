# Serverless application to notify about new submitted data

This is simple "Contact Us" application contains static frontend part (Vuejs + Bulma) and API to procced data and send notification about new requests.
API endpoint build with AWS API Gateway and AWS Lambda. Static site hosted on AWS S3. Notifications are pushed to AWS SNS.

## Requirements

1. [AWS CLI](https://docs.aws.amazon.com/cli/index.html)
2. [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
3.  npm

## Configuration

Edit config section in `package.json`:
 - region: define AWS region where resources will be created
 - s3BucketName: bucket name that will be created to store static site and SAM template
 - snsEmailAddress: your email address to receive notifications
 - template: name of SAM tamplate (you can keep current value)
 - stackName: stack name for Cloudformation. keep current name from config, or use your own

 Example of config section

`"config": {
    "region": "eu-central-1",
    "s3BucketName": "mys3bucketforserverless",
    "snsEmailAddress": "notification@example.com",
    "template": "./template.yaml",
    "stackName": "serverless-contact-form"
  }`

## How to deploy

1. `npm install`
2. `npm run create-bucket`
3. `npm run deploy-api`
4. copy endpoint URL from previous step to ./static/config.js
5. `npm run deploy-static`
