const aws = require("aws-sdk");

const dynamodb = new aws.DynamoDB.DocumentClient({});

const updateUsers = async (event, context) => {
  let userId = event.pathParameters.id;

  const body = JSON.parse(event.body);

  const params = {
    TableName: "usersTable",
    Key: { pk: userId },
    UpdateExpression: "set #name = :name",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": body.name,
    },
    ReturnValues: "ALL_NEW",
  };

  return dynamodb
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      return {
        statusCode: 200,
        body: JSON.stringify({ user: res.Attributes }),
      };
    });
};

module.exports = {
  updateUsers,
};
