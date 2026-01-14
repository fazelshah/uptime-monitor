import AWS from "aws-sdk";

const sns = new AWS.SNS();

export async function sendAlert(message: string) {
  if (!process.env.SNS_TOPIC_ARN) return;

  await sns
    .publish({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Message: message
    })
    .promise();
}
