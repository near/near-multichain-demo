import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: Record<string, unknown>) => {
    return {
      html: {
        'font-family': 'Mona Sans',
      },
      body: {
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: `'Nunito Sans', sans-serif`,
        bg: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '*::placeholder': {
        color: mode('gray.600', 'whiteAlpha.400')(props),
        fontSize: '14px',
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
    };
  },
};

const colors = {
  '--Sand-Light-1': '#FDFDFC',
  '--Sand-Light-2': '#F9F9F8',
  '--Sand-Light-4': '#EEEEEC',
  '--Sand-Light-6': '#E3E3E0',
  '--Sand-Light-11': '#706F6C',
  '--Sand-Light-12': '#1B1B18',
};

export const theme = extendTheme({
  styles,
  colors,
  components: {
    Input: {
      baseStyle: {},
      variants: {
        defaultVariant: {
          field: {
            fontSize: '14px',
            border: '1px solid',
            borderColor: '#DCDFE3',
            _hover: {},
            _focus: {
              outline: 'none',
            },
          },
        },
      },
      defaultProps: {
        variant: 'defaultVariant',
      },
    },
  },
});

export default theme;
