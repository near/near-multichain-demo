export type KeyType = {
  label: string;
  value: string;
  iconImage: string;
};

const keyTypes: KeyType[] = [
  {
    label: 'Domain Key',
    value: 'domainKey',
    iconImage: '/images/DomainKey.svg',
  },
  {
    label: 'Personal Key',
    value: 'personalKey',
    iconImage: '/images/PersonalKey.svg',
  },
  {
    label: 'Unknown Key',
    value: 'unknownKey',
    iconImage: '/images/unknownKey.svg',
  },
];

export default keyTypes;
