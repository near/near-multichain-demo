import { Image } from '@chakra-ui/react';
import { components, DropdownIndicatorProps } from 'chakra-react-select';

import CaretUpDown from '@/assets/CaretUpDown.svg';

const DropdownIndicator = (
  props: DropdownIndicatorProps<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={`${CaretUpDown}`} />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
