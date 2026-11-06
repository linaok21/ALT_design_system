import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        page: { name: 'Page (fill/page/primary)', value: '#17181a' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
    controls: { matchers: { color: /(background|color)$/i } },
  },
  initialGlobals: { backgrounds: { value: 'page' } },
};
export default preview;
