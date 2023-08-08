const aws = require("aws-sdk");

const dynamodb = new aws.DynamoDB.DocumentClient({});

const getUsers = async (event, context) => {
  let userId = event.pathParameters.id;

  const params = {
    TableName: "usersTable",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": userId,
    },
  };

  return dynamodb
    .query(params)
    .promise()
    .then((res) => {
      console.log(res);
      return {
        statusCode: 200,
        body: JSON.stringify({ user: res.Items }),
      };
    });
};

module.exports = {
  getUsers,
};
