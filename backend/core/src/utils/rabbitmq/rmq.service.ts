import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'

@Injectable()
export class RmqService {
	constructor(private readonly configService: ConfigService) {}

	getOptions(options: { queue: string; noAck?: boolean; prefetchCount?: number }): RmqOptions {
		if (!options.queue) {
			throw new Error('queue is required')
		}

		if (!options.noAck) {
			options.noAck = false
		}

		const RABBIT_MQ_URI = this.configService.get<string>('RABBIT_MQ_URI')
		if (!RABBIT_MQ_URI) {
			throw new Error('RABBIT_MQ_URI is required')
		}

		return {
			transport: Transport.RMQ,
			options: {
				urls: [RABBIT_MQ_URI],
				queue: this.configService.get<string>(`RABBIT_MQ_${options.queue}_QUEUE`),
				noAck: options.noAck,
				persistent: true,
				socketOptions: {
					heartbeatIntervalInSeconds: 30,
				},
				prefetchCount: options.prefetchCount,
			},
		}
	}

	ack(context: RmqContext) {
		const channel = context.getChannelRef()
		const originalMessage = context.getMessage()
		channel.ack(originalMessage)
	}
}
