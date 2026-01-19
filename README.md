# Uptime Monitor

A lightweight uptime monitoring service that checks website endpoints every minute and sends alerts when they go down.

### Features
- 1-minute HTTP/HTTPS checks
- Status & response-time tracking
- Email / Slack alerts (via SNS)
- AWS-native (Lambda + EventBridge + RDS)
- Open-source & extensible

## Architecture
EventBridge → Lambda → HTTP Checks → RDS → SNS Alerts

## Tech Stack
- Node.js (TypeScript)
- AWS Lambda
- AWS EventBridge
- AWS RDS (PostgreSQL)
- AWS SNS

## Deployment
Infrastructure is managed using Terraform.

### License
MIT
