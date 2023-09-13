import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-oauth20'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { UsersService } from '../../users/users.service'
import { defaultSSOString } from '../../../configs/sso.config.joi'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(@Inject(forwardRef(() => UsersService)) private usersService: UsersService) {
		super({
			clientID: process.env.GOOGLE_CLIENT_ID ?? defaultSSOString,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? defaultSSOString,
			callbackURL: `${process.env.BASE_URL_APP}/login`,
			scope: ['email', 'profile'],
		})
	}

	async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
		const { emails } = profile
		return await this.usersService.validateEmail(emails[0].value)
	}
}