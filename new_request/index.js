
var AWS = require('aws-sdk');

AWS.config.region = process.env.REGION;

var sns = new AWS.SNS();
var snsTopic = process.env.NEW_CONTACT_TOPIC;

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
    const body = JSON.parse(event.body);
    const message = 'Name: ' + body.name + "\r\nEmail: " + body.email;
   
    // publish data to SNS topic
    try {
        await sns.publish({
            "Message":message,
            "MessageAttributes": {
                "name": {"DataType":"String", "StringValue": body.name},
                "email": {"DataType":"String", "StringValue": body.email}
            },
            'Subject': 'New Contact request!',
            'TopicArn': snsTopic
        }).promise();
        console.log("Message written into SNS");
    } catch (err) {
        console.log("SNS Error: ", err);
        return httpResponse(500, "KO");
    }

    return httpResponse(200, "OK");
};

