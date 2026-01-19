resource "aws_db_instance" "uptime_db" {
  identifier             = "uptime-db"
  engine                 = "postgres"
  engine_version         = "15.3"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20

  db_name                = "uptime"
  username               = "uptime"
  password               = var.db_password

  skip_final_snapshot    = true
  deletion_protection    = false
  publicly_accessible    = false

  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
}
