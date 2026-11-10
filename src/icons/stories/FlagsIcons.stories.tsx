import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flag } from '../CodeIcons';
import { IconGallery } from './IconGallery';
import { EMPTY_HINT, galleryItems } from './codeGalleries';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220103';

const meta = {
  title: 'Foundations/Icons/Flags',
  component: Flag,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA },
    docs: { description: { component: 'Круглі прапори за кодом країни чи регіону.\n\n' +
          '```tsx\n<Flag country="UA" size={24} />\n```\n\n' +
          '**Які коди використовуються**\n' +
          '1. ISO 3166-1 для країн: `UA`, `US`, `GB`\n' +
          '2. ISO 3166-2 для регіонів: `GB-ENG`, `US-HI`, `ES-CN`, `GE-AB`\n' +
          '3. Загальноприйняті: `XK` (Kosovo), `EU`, `UN`\n' +
          '4. Власні з префіксом `X-` для місць без коду: `X-NATO`, `X-NCY`, `X-SOS`, `X-TRN`, `X-SML`, `X-RAP`\n\n' +
          'Пошук знаходить і старі назви: Turkey, Swaziland, Macedonia.' } },
  },
  args: { country: 'UA', size: 40 },
  argTypes: { size: { control: { type: 'range', min: 12, max: 64, step: 4 } } },
} satisfies Meta<typeof Flag>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Введи код на панелі Controls. Невідомий код → нейтральне коло з літерами. */
export const Playground: Story = {};

export const UnknownCode: Story = {
  name: 'Unknown code (fallback)',
  args: { country: 'ZZ' },
};

/** Усі іконки групи. Клацни — скопіюється код компонента. */
export const All: Story = {
  name: 'All flags',
  parameters: { controls: { disable: true } },
  render: () => (
    <IconGallery
      items={galleryItems('flags')}
      defaultSize={24}
      sizes={[16, 20, 24, 32, 40]}
      placeholder="Search: UA, Ukraine, Turkey…"
      hint={EMPTY_HINT}
    />
  ),
};
