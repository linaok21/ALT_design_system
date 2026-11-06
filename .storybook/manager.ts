import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'ALT UI Kit',
    colorPrimary: '#ffd84d',
    colorSecondary: '#ffd84d',
    appBg: '#17181a',
    appContentBg: '#17181a',
    fontBase: '"Inter", system-ui, sans-serif',
  }),
});
