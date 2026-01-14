"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAlert = sendAlert;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const sns = new aws_sdk_1.default.SNS();
async function sendAlert(message) {
    if (!process.env.SNS_TOPIC_ARN)
        return;
    await sns
        .publish({
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: message
    })
        .promise();
}
