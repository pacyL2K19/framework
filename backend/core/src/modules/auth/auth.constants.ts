export const AUTH_CODE = 'AUTH_CODE'
export const AUTH_ACCOUNT_IDS = 'auth_account_ids'
export const AUTH_ACCOUNT_ROLE = 'auth_account_role'

export const JWT = 'jwt'
export const AZURE_AD = 'azure-ad'

export const DEFAULT_ACCESS_TOKEN_EXPIRY_MINUTES = 60 // A commonly recommended expiration time for an access token is short, ranging from 15 minutes to 1 hour, to minimize the window of vulnerability if it gets compromised.
export const DEFAULT_REFRESH_EXPIRY_DAYS = 14 // Refresh tokens, which are used to obtain new access tokens without requiring user re-authentication, have a longer lifespan, often set between 14 days to 6 months, depending on the level of security required. Long-lived refresh tokens increase convenience but require careful handling to mitigate security risks.
