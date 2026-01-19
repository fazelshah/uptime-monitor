resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet("10.0.0.0/16", 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "uptime-private-${count.index}"
  }
}

data "aws_availability_zones" "available" {}

# RDS requires a DB subnet group
resource "aws_db_subnet_group" "db_subnets" {
  name       = "uptime-db-subnets"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "uptime-db-subnets"
  }
}
