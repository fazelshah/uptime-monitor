import AWS from "aws-sdk";

const sns = new AWS.SNS();

export async function sendAlert(message: string) {
  await sns
    .publish({
      TopicArn: process.env.SNS_TOPIC_ARN!,
      Message: message
    })
    .promise();
}
