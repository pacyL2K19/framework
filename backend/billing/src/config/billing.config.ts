import { registerAs } from '@nestjs/config'

export default registerAs(
	'billing',
	() =>
		<any>{
			BILLING_DEFAULT_PLAN: process.env.BILLING_DEFAULT_PLAN,
			BILLING_MINIMUM_CHARGE: process.env.BILLING_MINIMUM_CHARGE,
			CRON_BILLING_INVOICES_GENERATE: process.env.CRON_BILLING_INVOICES_GENERATE,
			CRON_BILLING_INVOICES_GENERATE_FREQUENCY: process.env.CRON_BILLING_INVOICES_GENERATE_FREQUENCY,
			CRON_BILLING_INVOICES_RESEND: process.env.CRON_BILLING_INVOICES_RESEND,
			CRON_BILLING_INVOICES_RESEND_FREQUENCY: process.env.CRON_BILLING_INVOICES_RESEND_FREQUENCY,
			CRON_BILLING_INVOICES_SETTLE: process.env.CRON_BILLING_INVOICES_SETTLE,
			CRON_BILLING_INVOICES_SETTLE_FREQUENCY: process.env.CRON_BILLING_INVOICES_SETTLE_FREQUENCY,
			CRON_BILLING_SUBSCRIPTIONS_REBILL: process.env.CRON_BILLING_SUBSCRIPTIONS_REBILL,
			CRON_BILLING_SUBSCRIPTIONS_REBILL_FREQUENCY: process.env.CRON_BILLING_SUBSCRIPTIONS_REBILL_FREQUENCY,
			CRON_BILLING_WITHDRAWALS_SETTLE: process.env.CRON_BILLING_WITHDRAWALS_SETTLE,
			CRON_BILLING_WITHDRAWALS_SETTLE_FREQUENCY: process.env.CRON_BILLING_WITHDRAWALS_SETTLE_FREQUENCY,
			CRON_BILLING_WALLET_SETTLE_BALANCES: process.env.CRON_BILLING_WALLET_SETTLE_BALANCES,
			CRON_BILLING_WALLET_SETTLE_BALANCES_FREQUENCY: process.env.CRON_BILLING_WALLET_SETTLE_BALANCES_FREQUENCY,
		},
)
