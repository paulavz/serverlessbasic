const aws = require("aws-sdk");
const crypto = require("crypto");

const dynamodb = new aws.DynamoDB.DocumentClient({});

const createUsers = async (event, context) => {
  const id = crypto.randomUUID();

  let userBody = JSON.parse(event.body);

  userBody.pk = id;

  const params = {
    TableName: "usersTable",
    Item: userBody,
  };

  return dynamodb
    .put(params)
    .promise()
    .then((res) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ user: params.Item }),
      };
    });
};

module.exports = {
  createUsers,
};
