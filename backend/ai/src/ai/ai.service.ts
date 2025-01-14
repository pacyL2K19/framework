import { AppIntegrationName, Query } from '@juicyllama/core'
import { Env, Logger, Modules } from '@juicyllama/utils'
import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common'
import { LazyModuleLoader } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { AiChatRequest } from './ai.dto'
import { Ai } from './ai.entity'
import { AiSuccessType } from './ai.enums'
import * as mock from './ai.mock.json'

@Injectable()
export class AiService {
	constructor(
		@InjectRepository(Ai) private readonly repository: Repository<Ai>,
		@Inject(forwardRef(() => Logger)) private readonly logger: Logger,
		@Inject(forwardRef(() => Query)) private readonly query: Query<Ai>,
		@Inject(forwardRef(() => LazyModuleLoader)) private readonly lazyModuleLoader: LazyModuleLoader,
	) {}

	async chat(options: AiChatRequest): Promise<Ai> {
		const domain = 'ai::chat'

		this.logger.debug(`[${domain}] Ai request`, options)

		if (Env.IsTest()) {
			this.logger.debug(`[${domain}] Skipping as in test mode`)
			return <any>mock
		}

		let ai: Ai | undefined = undefined

		if (options.use_local_cache) {
			ai = await this.query.findOne(this.repository, {
				where: {
					request: options.question?.toLowerCase(),
					is_general: true,
					is_sql: false,
				},
			})

			if (ai?.success === AiSuccessType.USER_HAPPY) {
				return ai
			}
		}

		let service: any

		if (!ai) {
			ai = await this.query.create(this.repository, {
				request: options.question?.toLowerCase(),
				is_general: true,
				is_sql: false,
			})
		}

		if (Modules.openai.isInstalled) {
			const { OpenaiModule, OpenaiService } = await Modules.openai.load()
			ai.app_integration_name = AppIntegrationName.openai

			try {
				const openaiModule = await this.lazyModuleLoader.load(() => OpenaiModule)
				service = openaiModule.get(OpenaiService)

				if (!options.openaiOptions) {
					options.openaiOptions = {}
				}

				if (!options.openaiOptions?.messages) {
					options.openaiOptions.messages = [
						{
							role: 'user',
							content: options.question,
						},
					]
				}

				//general AI question
				const result = await service.ask(options.openaiOptions)

				if (result?.created) {
					ai.response = result.choices[0].message.content
					ai.success = AiSuccessType.SUCCESS
				} else {
					const error = `Failed to parse response from OpenAI`
					ai.success = AiSuccessType.ERROR
					ai.error_message = error
					this.logger.error(`[${domain}] ${error}`, result)
				}
			} catch (e: any) {
				this.logger.error(`[${domain}] ${e.message}`, e)
				ai.success = AiSuccessType.ERROR
				ai.error_message = e.message
			}

			if (!service) {
				const error = `No AI module installed, please contact your system admin.`
				this.logger.error(`No ai app installed, options are: OpenAI`)
				ai.success = AiSuccessType.ERROR
				ai.error_message = error
			}

			return await this.query.update(this.repository, ai)
		}
		throw new Error('No AI module installed, please contact your system admin.')
	}

	// async sql(options: AiSQLRequest): Promise<Ai> {
	// 	const domain = 'ai::sql'

	// 	this.logger.debug(`[${domain}] Ai request`, options)

	// 	let ai

	// 	if (options.use_local_cache) {
	// 		ai = await this.db_query.findOne(this.repository, {
	// 			where: {
	// 				request: options.question.toLowerCase(),
	// 				is_general: false,
	// 				is_sql: true,
	// 			},
	// 		})

	// 		if (!ai) {
	// 			ai = await this.db_query.create(this.repository, {
	// 				request: options.question.toLowerCase(),
	// 				is_general: false,
	// 				is_sql: true,
	// 			})
	// 		}

	// 		if (ai.success === AiSuccessType.USER_HAPPY) {
	// 			return ai
	// 		}
	// 	}

	// 	let service: any

	// 	if (Modules.isInstalled('@juicyllama/app-openai')) {
	// 		//@ts-ignore
	// 		const { OpenaiModule, OpenaiService, OpenAiConvertNLtoSQLTypes } = await import('@juicyllama/app-openai')
	// 		ai.app_integration_name = AppIntegrationName.openai

	// 		try {
	// 			const openaiModule = await this.lazyModuleLoader.load(() => OpenaiModule)
	// 			service = openaiModule.get(OpenaiService)

	// 			ai.response = await service.sql(
	// 				options.sql.repos,
	// 				options.question,
	// 				OpenAiConvertNLtoSQLTypes[options.sql.type],
	// 			)

	// 			try {
	// 				ai.sql_result = await this.db_query.raw(this.repository, ai.response)

	// 				//todo convert back to natural language, passingh question and DB result

	// 				//sql_result_nl =

	// 				return ai
	// 			} catch (e: any) {
	// 				const error = `I'm still learning and could now answer this question just yet, but I will improve. Please keep asking me questions so I can continue to learn.`
	// 				this.logger.log(`[${domain}] SQL Error: ${e.message}`, {
	// 					sql: ai.response,
	// 				})
	// 				ai.success = AiSuccessType.SQL_ERROR
	// 				ai.error_message = error
	// 				return await this.db_query.update(this.repository, ai)
	// 			}
	// 		} catch (e: any) {
	// 			this.logger.error(`[${domain}] ${e.message}`, e)
	// 			ai.success = AiSuccessType.ERROR
	// 			await this.db_query.update(this.repository, ai)
	// 		}

	// 		if (!service) {
	// 			const error = `No AI module installed, please contact your system admin.`
	// 			this.logger.error(`No ai app installed, options are: OpenAI`)
	// 			ai.success = AiSuccessType.ERROR
	// 			ai.error_message = error
	// 			return await this.db_query.update(this.repository, ai)
	// 		}

	// 		return
	// 	}
	// }

	// async image(options: AiImageRequest): Promise<Ai> {
	// 	const domain = 'ai::image'

	// 	this.logger.debug(`[${domain}] Ai request`, options)

	// 	let service: any

	// 	const ai: Ai = await this.db_query.create(this.repository, {
	// 		request: options.image_description.toLowerCase(),
	// 		is_general: false,
	// 		is_sql: false,
	// 	})

	// 	if (Modules.isInstalled('@juicyllama/app-openai')) {
	// 		//@ts-ignore
	// 		const { OpenaiModule, OpenaiService } = await import('@juicyllama/app-openai')
	// 		ai.app_integration_name = AppIntegrationName.openai

	// 		try {
	// 			const openaiModule = await this.lazyModuleLoader.load(() => OpenaiModule)
	// 			service = openaiModule.get(OpenaiService)

	// 			if (!options.openaiOptions) {
	// 				options.openaiOptions = {}
	// 			}

	// 			if (!options.openaiOptions?.prompt) {
	// 				options.openaiOptions.prompt = options.image_description.toLowerCase()
	// 			}

	// 			const result = await service.image(options.openaiOptions)

	// 			if (result?.created) {
	// 				ai.response = result.data[0].url
	// 				ai.success = AiSuccessType.SUCCESS
	// 			} else {
	// 				const error = `Failed to parse response from OpenAI`
	// 				this.logger.log(`[${domain}] ${error}`)
	// 				ai.success = AiSuccessType.ERROR
	// 				ai.error_message = error
	// 			}
	// 		} catch (e: any) {
	// 			this.logger.error(`[${domain}] ${e.message}`, e)
	// 			ai.success = AiSuccessType.ERROR
	// 			ai.error_message = e.message
	// 		}

	// 		if (!service) {
	// 			const error = `No AI module installed, please contact your system admin.`
	// 			this.logger.error(`No ai app installed, options are: OpenAI`)
	// 			ai.success = AiSuccessType.ERROR
	// 			ai.error_message = error
	// 		}

	// 		return await this.db_query.update(this.repository, ai)
	// 	}
	// }

	// async train(training: AiTrainingRequestDto) {
	// 	console.log(training)
	// 	/*
	//
	// 	let service: any
	//
	// 	if (Modules.isInstalled('@juicyllama/app-openai')) {
	// 		const { OpenaiModule, OpenaiService, OpenAiConvertNLtoSQLTypes } = await import('@juicyllama/app-openai')
	// 		const openaiModule = await this.lazyModuleLoader.load(() => OpenaiModule)
	// 		service = openaiModule.get(OpenaiService)
	// 		return service.convertNLtoSQL(repos, question, OpenAiConvertNLtoSQLTypes.SELECT)
	//
	//
	// 	if (!service) {
	// 		this.logger.error(`No ai app installed, options are: OpenAI`)
	// 		return
	// 	}
	// 	}*/
	//
	// 	try {
	// 		//return this.openaiService.train(training.training_data)
	// 	} catch (e) {
	// 		this.logger.error(e.message, e)
	// 		return
	// 	}
	// }

	/**
	 * Update ai
	 * @param data
	 */
	async update(data: DeepPartial<Ai>): Promise<Ai> {
		if (!data.ai_id) {
			throw new Error('ai_id is required')
		}
		const lana = await this.query.findOneById(this.repository, data.ai_id)

		if (!lana) {
			throw new NotFoundException(`Ai #${data.ai_id} not found`)
		}

		return await this.query.update(this.repository, {
			ai_id: lana.ai_id,
			...data,
		})
	}
}
