import type { Meta, StoryObj } from '@storybook/react-vite';
import { CurrencyIcon } from '../CodeIcons';
import { IconGallery } from './IconGallery';
import { EMPTY_HINT, galleryItems } from './codeGalleries';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220103';

const meta = {
  title: 'Foundations/Icons/Currency',
  component: CurrencyIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA },
    docs: { description: { component: 'Фіатні валюти за кодом ISO 4217.\n\n' +
          '```tsx\n<CurrencyIcon code="UAH" size={24} />\n```\n\n' +
          'Невідомий код → нейтральне коло з літерами.' } },
  },
  args: { code: 'UAH', size: 40 },
  argTypes: { size: { control: { type: 'range', min: 12, max: 64, step: 4 } } },
} satisfies Meta<typeof CurrencyIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Введи код на панелі Controls. Невідомий код → нейтральне коло з літерами. */
export const Playground: Story = {};

export const UnknownCode: Story = {
  name: 'Unknown code (fallback)',
  args: { code: 'CHF' },
};

/** Усі іконки групи. Клацни — скопіюється код компонента. */
export const All: Story = {
  name: 'All currency',
  parameters: { controls: { disable: true } },
  render: () => (
    <IconGallery
      items={galleryItems('currency')}
      defaultSize={24}
      sizes={[16, 20, 24, 32, 40]}
      placeholder="Search: UAH, Dollar…"
      hint={EMPTY_HINT}
    />
  ),
};
