import { IStage, IProject } from './model'

export const PROJECT: IProject = {
  ALLOWED_IP: ['0.0.0.0'],
  CLOUDFRONT_CERTIFICATE_REGION: 'us-east-1',
  CROSS_ACCOUNT_ROLE_ARN: 'arn:aws:iam::123456789999:role/NameOfYourRole',
  DNS_ACCOUNT: '123456789999',
  PRIMARY_REGION: 'ca-central-1',
  VALIDATION_METHOD: 'DNS',
}

export const DEVELOPMENT: IStage = {
  ...PROJECT,
  ACCOUNT_NUMBER: '111111111111',
  ALTERNATE_DOMAIN_NAME: [],
  DOMAIN_NAME: 'dev.example.com',
  STAGE_NAME: 'dev',
}

export const PRODUCTION: IStage = {
  ...PROJECT,
  ACCOUNT_NUMBER: '222222222222',
  ALTERNATE_DOMAIN_NAME: ['www.example.com'],
  DOMAIN_NAME: 'example.com',
  STAGE_NAME: 'prod',
}

export const STAGES = [
  DEVELOPMENT,
  PRODUCTION,
]

//In summary, this function searches through an array of IStage objects ( STAGES) and 
//returns the first object whose STAGE_NAME property matches the provided stageShortName.
//If no match is found, it returns undefined.
export const getStageFromShortName = (stageShortName: string): IStage | undefined => {
  return STAGES.find((stage) => stage.STAGE_NAME === stageShortName)
}