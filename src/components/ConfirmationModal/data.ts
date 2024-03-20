import {
  DomainKeyPayloadType,
  PersonalKeyPayloadType,
  WrongKeyPayloadType,
} from './types';

export const SAMPLE_DOMAIN_KEY_PAYLOAD: DomainKeyPayloadType = {
  domain: 'https://demo.near.org',
  address: 'mw5vJDm1Vx0xyBCiMsaT7',
  amount: 0.034,
  fees: [2.3, 2.9],
  assetType: 'btc',
  total: 2.33,
};

export const SAMPLE_PERSONAL_KEY_PAYLOAD: PersonalKeyPayloadType = {
  domain: 'https://app.refinance.com',
  address: 'mw5vJDm1Vx0xyBCiMsaT7',
  fees: [2.3],
  paymentMedium: 'sweat',
  email: 'johndoe112@gmail.com',
  message: 'Message content',
};

export const SAMPLE_WRONG_KEY_PAYLOAD: WrongKeyPayloadType = {
  message: 'This is a confirmation',
};
