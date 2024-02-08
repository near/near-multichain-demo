import DomainKey from '@/assets/DomainKey.svg';
import PersonalKey from '@/assets/PersonalKey.svg';
import WrongDomainKey from '@/assets/WrongDomainKey.svg';

const keyTypes = [
  {
    name: 'Domain Key',
    value: 'domain-key',
    iconImage: DomainKey,
  },
  {
    name: 'Personal Key',
    value: 'personal-key',
    iconImage: PersonalKey,
  },
  {
    name: 'Wrong Domain Key',
    value: 'wrong-domain-key',
    iconImage: WrongDomainKey,
  },
];

export default keyTypes;
