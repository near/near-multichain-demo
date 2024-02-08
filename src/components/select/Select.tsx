import React from 'react';
import Select, { Props, components } from 'react-select';
import { StylesConfig } from 'react-select/dist/declarations/src/styles';

import DropdownIndicator from './DropdownIndicator';
//eslint-disable-next-line
interface CustomSelectProps extends Props<any> {
  // Define any additional props you need
  customStyles?: StylesConfig;
  components?: typeof components;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  customStyles,
  components,
  ...props
}) => {
  const defaultStyles: StylesConfig = {
    container: (provided, state) => ({
      ...provided,
      borderRadius: '6px',
      border: '0.3px solid',
      borderColor: state.isFocused ? '#604CC8' : '#E3E3E0',
      boxShadow: state.isFocused ? '0px 0px 0px 4px #CBC7F4' : 'none',
      backgroundColor: '#FFFFFF',
      outline: 'none',
    }),
    // Define your default styles here, or you can override them using customStyles prop
    input: provided => ({
      // class attribute : class=" css-i32vvf-control"
      ...provided,
      padding: '8px 12px',
      borderRadius: 'inherit',
      fontSize: '16px',
      fontWeight: 450,
      color: '#1B1B18',
      fontFamily: 'Mona Sans',
      letterSpacing: '0.32px',
    }),
    control: provided => ({
      // class attribute : class=" css-i32vvf-control"
      ...provided,
      height: 40,
      minHeight: 'initial',
    }),

    placeholder: provided => ({
      ...provided,
      color: '#1B1B18', // Customize placeholder color
    }),

    menu: provided => ({
      ...provided,
      borderRadius: '6px', // Customize placeholder color
      backgroundColor: '#FDFDFC',
      boxShadow:
        '0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(0, 0, 0, 0.06)',
      padding: '0px 4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#EEEEEC' : 'white',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: 0,
    }),
  };
  return (
    <Select
      styles={{ ...defaultStyles, ...customStyles }}
      components={{
        DropdownIndicator,
        IndicatorSeparator: () => null,
        ...components,
      }}
      {...props}
    />
  );
};

export default CustomSelect;