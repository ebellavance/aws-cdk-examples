export interface IProject {
  readonly ALLOWED_IP: string[]
  readonly CLOUDFRONT_CERTIFICATE_REGION: string
  readonly CROSS_ACCOUNT_ROLE_ARN: string
  readonly DNS_ACCOUNT: string
  readonly PRIMARY_REGION: string
  readonly VALIDATION_METHOD: 'DNS' | 'EMAIL'
}

export interface IStage extends IProject {
  readonly ACCOUNT_NUMBER: string
  readonly ALTERNATE_DOMAIN_NAME?: string[]
  readonly DOMAIN_NAME: string
  readonly STAGE_NAME: string
}
  