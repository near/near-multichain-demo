export type DomainKeyPayloadType = {
  asset: string;
  domain: string;
  amount: number;
  address: string;
  fees: number[];
  total: number;
};

export type PersonalKeyPayloadType = {
  domain: string;
  email: string;
  message: string;
  address: string;
  fees: number[];
  paymentMedium: string;
};

export type WrongKeyPayloadType = {
  message: string;
};

export type ConfirmationKeyType = 'domainKey' | 'personalKey' | 'wrongKey';
export type ConfirmationPayload =
  | DomainKeyPayloadType
  | PersonalKeyPayloadType
  | WrongKeyPayloadType;

export type ModalContentsPayload =
  | {
      confirmationType: 'domainKey';
      confirmationPayload: DomainKeyPayloadType;
    }
  | {
      confirmationType: 'personalKey';
      confirmationPayload: PersonalKeyPayloadType;
    }
  | {
      confirmationType: 'wrongKey';
      confirmationPayload: WrongKeyPayloadType;
    };
