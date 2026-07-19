# SQS Module
resource "aws_sqs_queue" "events" {
  name                       = var.queue_name
  visibility_timeout_seconds = var.visibility_timeout_seconds
  message_retention_seconds  = var.message_retention_seconds
  receive_wait_time_seconds  = var.receive_wait_time_seconds

  tags = {
    Name = "scrapninja-${var.queue_name}"
  }
}

resource "aws_sqs_queue" "events_dlq" {
  count = var.dlq_enabled ? 1 : 0
  name  = "${var.queue_name}-dlq"

  tags = {
    Name = "scrapninja-${var.queue_name}-dlq"
  }
}

resource "aws_sqs_queue_redrive_policy" "events" {
  count            = var.dlq_enabled ? 1 : 0
  queue_url        = aws_sqs_queue.events.id
  redrive_policy   = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.events_dlq[0].arn
    maxReceiveCount     = var.dlq_max_receive_count
  })
}

output "queue_url" {
  value = aws_sqs_queue.events.url
}

output "queue_arn" {
  value = aws_sqs_queue.events.arn
}

output "queue_name" {
  value = aws_sqs_queue.events.id
}

output "dlq_url" {
  value = var.dlq_enabled ? aws_sqs_queue.events_dlq[0].url : null
}
