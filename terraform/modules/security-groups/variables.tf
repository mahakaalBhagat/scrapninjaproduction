variable "environment" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "alb_ingress_rules" {
  type = any
}

variable "backend_ingress_rules" {
  type = any
}

variable "database_ingress_rules" {
  type = any
}
