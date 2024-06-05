export type KeyType = {
  label: string;
  value: string;
  iconImage: string;
  assistiveMessage: string;
};

const keyTypes: KeyType[] = [
  {
    label: 'Domain Key',
    value: 'domainKey',
    iconImage: '/images/DomainKey.svg',
    assistiveMessage: 'No confirmation required',
  },
  {
    label: 'Personal Key',
    value: 'personalKey',
    iconImage: '/images/PersonalKey.svg',
    assistiveMessage: 'Request for confirmation',
  },
  {
    label: 'Unknown Key',
    value: 'unknownKey',
    iconImage: '/images/unknownKey.svg',
    assistiveMessage: 'Warning message before confirming',
  },
];

export default keyTypes;
