import { ApiVersion } from '@shopify/shopify-api'
import { IsString, IsNumber, IsOptional, IsObject, IsDateString, IsBoolean } from 'class-validator'

export class ShopifyRest {
    @IsString()
    api_version: ApiVersion
}


export class ShopifyRestList extends ShopifyRest {
    @IsDateString()
    @IsOptional()
    created_at_max?: Date

    @IsDateString()
    @IsOptional()
    created_at_min?: Date

    @IsString()
    @IsOptional()
    fields?: string

    @IsNumber()
    @IsOptional()
    limit?: number

    @IsNumber()
    @IsOptional()
    since_id?: number

    @IsDateString()
    @IsOptional()
    updated_at_max?: Date

    @IsDateString()
    @IsOptional()
    updated_at_min?: Date


}

export class ShopifyMarketingConsent {

    @IsString()
    @IsOptional()
    state?: string

    @IsString()
    @IsOptional()
    opt_in_level?: string

    @IsDateString()
    @IsOptional()
    consent_updated_at?: Date

    @IsString()
    @IsOptional()
    consent_collected_from?: string

}

export class ShopifyAddress {

    @IsString()
    @IsOptional()
    company?: string

    @IsString()
    @IsOptional()
    first_name?: string

    @IsString()
    @IsOptional()
    last_name?: string

    @IsString()
    @IsOptional()
    address1?: string

    @IsString()
    @IsOptional()
    address2?: string

    @IsString()
    @IsOptional()
    city?: string

    @IsString()
    @IsOptional()
    province?: string

    @IsString()
    @IsOptional()
    country?: string

    @IsString()
    @IsOptional()
    zip?: string

    @IsString()
    @IsOptional()
    phone?: string

    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    country_code?: string

    @IsString()
    @IsOptional()
    province_code?: string

    @IsNumber()
    @IsOptional()
    latitude?: number

    @IsNumber()
    @IsOptional()
    longitude?: number

}

export class ShopifyCustomer {

    @IsNumber()
    @IsOptional()
    id?: number

    @IsString()
    @IsOptional()
    email?: string

    @IsBoolean()
    @IsOptional()
    accepts_marketing?: boolean

    @IsDateString()
    @IsOptional()
    created_at?: Date

    @IsDateString()
    @IsOptional()
    updated_at?: Date

    @IsString()
    @IsOptional()
    first_name?: string

    @IsString()
    @IsOptional()
    last_name?: string

    @IsString()
    @IsOptional()
    state?: string

    @IsString()
    @IsOptional()
    note?: string

    @IsBoolean()
    @IsOptional()
    verified_email?: boolean

    @IsString()
    @IsOptional()
    multipass_identifier?: string

    @IsBoolean()
    @IsOptional()
    tax_exempt?: boolean

    @IsString()
    @IsOptional()
    phone?: string

    @IsString()
    @IsOptional()
    tags?: string

    @IsString()
    @IsOptional()
    currency?: string

    @IsDateString()
    @IsOptional()
    accepts_marketing_updated_at?: Date

    @IsString()
    @IsOptional()
    marketing_opt_in_level?: string

    @IsObject()
    @IsOptional()
    email_marketing_consent?: ShopifyMarketingConsent

    @IsObject()
    @IsOptional()
    sms_marketing_consent?: ShopifyMarketingConsent
        
}

export class ShopifyMoney {

    @IsString()
    amount: string

    @IsString()
    currency_code: string

}