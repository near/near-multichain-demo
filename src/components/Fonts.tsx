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
        font-family: 'FKGroteskNeueTrial-ThinItalic-BF6576818c5cbd8';
        src: url('./styles/fonts/FKGroteskNeueTrial-ThinItalic-BF6576818c5cbd8.woff2') format('woff2'),
        url('./styles/fonts/FKGroteskNeueTrial-ThinItalic-BF6576818c5cbd8.woff') format('woff');
        font-weight: 200 900;
        font-stretch: 75% 125%;
      }
    `}
  />
);

export default Fonts;
