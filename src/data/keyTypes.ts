import DomainKey from '@/assets/DomainKey.svg';
import PersonalKey from '@/assets/PersonalKey.svg';
import WrongDomainKey from '@/assets/WrongDomainKey.svg';

const keyTypes = [
  {
    label: 'Domain Key',
    value: 'domainKey',
    iconImage: DomainKey,
  },
  {
    label: 'Personal Key',
    value: 'personalKey',
    iconImage: PersonalKey,
  },
  {
    label: 'Wrong Domain Key',
    value: 'wrongDomainKey',
    iconImage: WrongDomainKey,
  },
];

export const signerAppBehavior: Record<string, string> = {
  domainKey: 'No confirmation required',
  personalKey: 'Request for confirmation',
  wrongDomainKey: 'Warning message before confirming',
};

export default keyTypes;
