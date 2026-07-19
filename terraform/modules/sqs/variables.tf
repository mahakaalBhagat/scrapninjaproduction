variable "environment" {
  type = string
}

variable "queue_name" {
  type = string
}

variable "visibility_timeout_seconds" {
  type    = number
  default = 30
}

variable "message_retention_seconds" {
  type    = number
  default = 1209600
}

variable "receive_wait_time_seconds" {
  type    = number
  default = 20
}

variable "dlq_enabled" {
  type    = bool
  default = true
}

variable "dlq_max_receive_count" {
  type    = number
  default = 3
}

variable "tags" {
  type    = map(string)
  default = {}
}
