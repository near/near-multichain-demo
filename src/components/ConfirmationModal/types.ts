export type DomainKeyPayloadType = {
  assetType: string;
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

export type ConfirmationType = 'DOMAIN_KEY' | 'PERSONAL_KEY' | 'WRONG_KEY';
export type ConfirmationPayload =
  | DomainKeyPayloadType
  | PersonalKeyPayloadType
  | WrongKeyPayloadType;

export type ModalContentsPayload =
  | {
      confirmationType: 'DOMAIN_KEY';
      confirmationPayload: DomainKeyPayloadType;
    }
  | {
      confirmationType: 'PERSONAL_KEY';
      confirmationPayload: PersonalKeyPayloadType;
    }
  | {
      confirmationType: 'WRONG_KEY';
    };
