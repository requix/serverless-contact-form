const redis = require('ioredis');
const client = new redis.Cluster([{host: process.env.ELASTICACHE_ENDPOINT,
                                   port: process.env.ELASTICACHE_PORT}]);

const { promisify } = require('util');
const incrAsync = promisify(client.incr).bind(client);

const buildResponse = (statusCode, message) => {

  return {
    statusCode: statusCode,
    body: JSON.stringify({'message': message}),
    headers: {
      "Content-Type": "application/json"
    }
  };

};

exports.lambdaHandler = async (event, context) => {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  
    try {
        await incrAsync("qty");    
    } catch (err) {
        console.error("ERROR: " + err);
        return buildResponse(500, "KO");
    }
    

    return buildResponse(200, "OK");
};
