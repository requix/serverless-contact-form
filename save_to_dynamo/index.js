var AWS = require('aws-sdk');
AWS.config.region = process.env.REGION;

var ddb = new AWS.DynamoDB();
var ddbTable =  process.env.STORAGE_DYNAMODB_TABLE;

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

exports.lambdaHandler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const name = event.Records[0].messageAttributes.name.stringValue;
    const email = event.Records[0].messageAttributes.email.stringValue;
    const message = 'Name: ' + name + "\r\nEmail: " + email;
   
  // save data to DynamoDB table
  var item = {
    'email': {'S': email},
    'name': {'S': name}
};

try {
    await ddb.putItem({
        'TableName': ddbTable,
        'Item': item,
        'Expected': { email: { Exists: false } }
    }).promise();
    console.log("Item written into Dynamo DB");
} catch (err) {
    console.log("Dynamo DB Error: ", err);
    var returnStatus = 500;
    if (err.code === 'ConditionalCheckFailedException') {
        returnStatus = 409;
    }
    return httpResponse(returnStatus, "KO");
}
};