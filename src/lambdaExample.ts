import { SQSEvent, SQSHandler } from 'aws-lambda';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDB({});
const dynamoDb = DynamoDBDocument.from(client);
const tableName = process.env.TABLE_NAME!;

export const handler: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const messageId = record.messageId;
    const body = record.body;

    // Check if the message already exists in DynamoDB
    const existingItem = await dynamoDb.get({
      TableName: tableName,
      Key: { messageId },
    });

    if (existingItem.Item) {
      console.log(`Message with ID ${messageId} already exists. Ignoring.`);
      continue;
    }

    // Store the message in DynamoDB
    await dynamoDb.put({
      TableName: tableName,
      Item: { messageId, body },
    });

    console.log(`Message with ID ${messageId} stored successfully.`);
  }
};
