import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const QuizPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#eef1fc',
      100: '#d9def7',
      200: '#b6c1f2',
      300: '#8397ec',
      400: '#4f6ae3',
      500: '#3252df',
      600: '#1f3fc9',
      700: '#1c35a3',
      800: '#182b7e',
      900: '#152463',
      950: '#121c47',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#3252df',
          // inverseColor: '#ffffff',
          hoverColor: '#1f3fc9',
          activeColor: '#1c35a3',
        },
        highlight: {
          background: '#3252df',
          focusBackground: '#1f3fc9',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '#8397ec',
          // inverseColor: '#152463',
          hoverColor: '#a6b6f2',
          activeColor: '#b6c1f2',
        },
        highlight: {
          background: 'rgba(131, 151, 236, 0.16)',
          focusBackground: 'rgba(131, 151, 236, 0.24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
  components: {
    inputtext: {
      root: {
        focusBorderColor: '#1f3fc9',
        hoverBorderColor: '#1f3fc9',
        invalidBorderColor: '#e24c4c',
        background: '#F5F6F8',
        borderColor: 'transparent',

        borderRadius: '4px',
      },
    },
  },
});
