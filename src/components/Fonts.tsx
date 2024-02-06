import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Mona Sans';
        src: url('./styles/fonts/Mona-Sans.woff2') format('woff2 supports variations'), url('./styles/fonts/Mona-Sans.woff2') format('woff2-variations');
        font-weight: 200 900;
        font-stretch: 75% 125%;
      }
      @font-face {
        font-family: 'FK Grotesk Monospaced';
        src: url('./styles/fonts/FKGMono.woff2') format('woff2'),
        url('./styles/fonts/FKGMono.woff') format('woff');
        font-weight:normal;
        font-style:normal;
        font-display:swap;
      }
    `}
  />
);

export default Fonts;
