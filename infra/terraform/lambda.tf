resource "aws_lambda_function" "uptime_checker" {
  function_name = "uptime-checker"
  runtime       = "nodejs20.x"
  handler       = "handler.handler"
  role          = aws_iam_role.lambda_role.arn

  filename         = "../../lambda.zip"
  source_code_hash = filebase64sha256("../../lambda.zip")

  environment {
    variables = {
      DB_HOST        = aws_db_instance.uptime_db.address
      DB_NAME        = "uptime"
      DB_USER        = "uptime"
      DB_PASSWORD    = var.db_password
      SNS_TOPIC_ARN  = aws_sns_topic.alerts.arn
    }
  }
}
