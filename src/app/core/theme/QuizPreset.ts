import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const QuizPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fbfdf2',
      100: '#f4f8dd',
      200: '#edf3c7',
      300: '#e2eba8',
      400: '#d5e28a',
      500: '#FFEDDF',
      600: '#afc45c',
      700: '#93a34a',
      800: '#78843b',
      900: '#5f692f',
      950: '#434b21',
    },

    colorScheme: {
      light: {
        primary: {
          color: '#FFEDDF',
          hoverColor: '#afc45c',
          activeColor: '#93a34a',
        },

        highlight: {
          background: '#C5D86D',
          focusBackground: '#afc45c',
          color: '#0D1321',
          focusColor: '#0D1321',
        },

        surface: {
          0: '#ffffff',
          50: '#FFEDDF',
        },
      },

      dark: {
        primary: {
          color: '#d5e28a',
          hoverColor: '#e2eba8',
          activeColor: '#edf3c7',
        },

        highlight: {
          background: 'rgba(197,216,109,.18)',
          focusBackground: 'rgba(197,216,109,.28)',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
    },
  },

  components: {
    inputtext: {
      root: {
        background: '#FFEDDF',
        borderColor: 'transparent',

        focusBorderColor: '#C5D86D',
        hoverBorderColor: '#C5D86D',
        invalidBorderColor: '#ef4444',

        color: '#0D1321',
        borderRadius: '6px',
      },
    },

    button: {
      root: {
        borderRadius: '6px',
      },
    },
  },
});
