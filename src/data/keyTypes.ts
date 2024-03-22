import DomainKey from '@/assets/DomainKey.svg';
import PersonalKey from '@/assets/PersonalKey.svg';
import WrongDomainKey from '@/assets/WrongDomainKey.svg';

const keyTypes = [
  {
    label: 'Domain Key',
    value: 'domainKey',
    iconImage: DomainKey,
    assistiveMessage: 'No confirmation required',
  },
  {
    label: 'Personal Key',
    value: 'personalKey',
    iconImage: PersonalKey,
    assistiveMessage: 'Request for confirmation',
  },
  {
    label: 'Wrong Domain Key',
    value: 'wrongKey',
    iconImage: WrongDomainKey,
    assistiveMessage: 'Warning message before confirming',
  },
];

export default keyTypes;
