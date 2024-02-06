import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: Record<string, unknown>) => {
    return {
      html: {
        'font-family': 'Mona Sans',
        width: '100%',
        height: '100vh',
      },
      body: {
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: `'Mona Sans', sans-serif`,
        bg: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '*::placeholder': {
        color: '--Sand-Light-10',
        fontSize: '14px',
      },
    };
  },
};

const colors = {
  '--Sand-Light-1': '#FDFDFC',
  '--Sand-Light-2': '#F9F9F8',
  '--Sand-Light-3': '#F3F3F2',
  '--Sand-Light-4': '#EEEEEC',
  '--Sand-Light-6': '#E3E3E0',
  '--Sand-Light-8': '#C8C7C1',
  '--Sand-Light-10': '#868682',
  '--Sand-Light-11': '#706F6C',
  '--Sand-Light-12': '#1B1B18',
  '--Sand-Dark-1': '#161615',
  '--Green-Light-8': '#37CD83',
  '--Green-Light-9': '#63E3A4',
  '--Green-Light-12': '#052E1A',
  '--Red-Light-8': '#D95C4A',
  '--Red-Light-9': '#F77A69',
  '--Red-Light-12': '#4B0B02',
  '--Violet-Light-8': '#604CC8',
  '--Violet-Light-12': '#191641',
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
            fontSize: '16px',
            fontWeight: 450,
            border: '1px solid',
            borderColor: '--Sand-Light-6',
            color: '--Violet-Light-12',
            backgroundColor: '--Sand-Light-1',
            padding: '8px 12px',
            height: '40px',
            borderRadius: '6px',
            letterSpacing: '0.32px',
            _hover: {},
            _focus: {
              outline: 'none',
              boxShadow: '0px 0px 0px 4px #CBC7F4',
              borderColor: '--Violet-Light-8',
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
