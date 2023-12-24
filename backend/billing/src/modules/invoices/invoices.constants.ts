import { Invoice } from './invoices.entity'

export const BILLING_INVOICES_NAME = 'invoice'
export const E = Invoice
export type T = Invoice
export const SEARCH_FIELDS = ['amount_total']
export const ORDER_BY = 'created_at'
export const PRIMARY_KEY = 'invoice_id'
export const CURRENCY_FIELD = 'currency'
export const CURRENCY_FIELDS = ['amount_subtotal', 'amount_tax', 'amount_total', 'amount_paid']

export const CRON_BILLING_INVOICES_GENERATE_DOMAIN = 'billing::invoices::cron::service::generateInvoices'
export const CRON_BILLING_INVOICES_RESEND_DOMAIN = 'billing::invoices::cron::service::resendInvoices'
export const CRON_BILLING_INVOICES_SETTLE_DOMAIN = 'billing::invoices::cron::service::settleInvoices'
