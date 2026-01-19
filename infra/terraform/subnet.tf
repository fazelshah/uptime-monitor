resource "aws_db_subnet_group" "db_subnets" {
  name       = "uptime-db-subnets"
  subnet_ids = aws_subnet.private[*].id
}
