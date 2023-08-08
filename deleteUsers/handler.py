import boto3, json

client = boto3.resource('dynamodb')

table = client.Table('usersTable')

def deleteUsers(event, context):
    user_id = event['pathParameters']['id']
    result = table.delete_item(Key = {'pk': user_id})

    body = json.dumps({ 'message' : f"user {user_id} deleted" })

    response = {
      'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
      'body': body
    }

    return response