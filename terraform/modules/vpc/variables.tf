variable "environment" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "public_subnets" {
  type = list(object({
    cidr = string
    az   = string
  }))
}

variable "private_subnets" {
  type = list(object({
    cidr = string
    az   = string
  }))
}

variable "enable_nat_gateway" {
  type    = bool
  default = true
}

variable "enable_vpn_gateway" {
  type    = bool
  default = false
}
