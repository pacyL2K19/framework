import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Api, Env, Logger } from '@juicyllama/utils'
import Joi from 'joi'
import shopifyConfig from '../../config/shopify.config'
import { shopifyConfigJoi } from '../../config/shopify.config.joi'
import { ShopifyAuthController } from './auth.controller'
import { AppsModule, InstalledAppsModule, OAuthModule } from '@juicyllama/app-store'
import { AuthModule, jwtConfig } from '@juicyllama/core'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [shopifyConfig],
			validationSchema: Env.IsNotTest() ? Joi.object(shopifyConfigJoi) : null,
		}),
		JwtModule.register(jwtConfig()),
		forwardRef(() => AuthModule),
		forwardRef(() => AppsModule),
		forwardRef(() => OAuthModule),
		forwardRef(() => InstalledAppsModule),
	],
	controllers: [ShopifyAuthController],
	providers: [Logger],
	exports: [],
})
export class ShopifyAuthModule {}
