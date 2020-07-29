var AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;

const s3 = new AWS.S3();
const STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET_NAME;

const httpResponse = (status, message) => {
  return {
      "body": JSON.stringify({'message': message}),
      "statusCode": status,
      "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials" : true,
          "Access-Control-Allow-Headers": "'x-requested-with'"
      },
  };
};

saveToS3 = (data, id) => {
    const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hash = id;

    return s3.putObject({
        Key: `${year}-${month}-${day}-${hash}`,
        Bucket: STORAGE_BUCKET_NAME,
        ContentType: 'application/json',
        Body: JSON.stringify(data, null, 2)
    });
};

exports.lambdaHandler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  const name = event.Records[0].messageAttributes.name.stringValue;
  const email = event.Records[0].messageAttributes.email.stringValue;
  const message = 'Name: ' + name + "\r\nEmail: " + email;
  
  try {
      await saveToS3(message, context.awsRequestId).promise();
      console.log("Data saved to S3 bucket");
  } catch (err) {
      console.log("S3 Error: ", err);
      return httpResponse(500, "KO");
  }
};