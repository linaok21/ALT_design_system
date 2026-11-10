import type { Meta, StoryObj } from '@storybook/react-vite';
import { CryptoIcon } from '../CodeIcons';
import { IconGallery } from './IconGallery';
import { EMPTY_HINT, galleryItems } from './codeGalleries';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220103';

const meta = {
  title: 'Foundations/Icons/Crypto',
  component: CryptoIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA },
    docs: { description: { component: 'Логотипи монет за тікером — тим самим, що приходить з API біржі.\n\n' +
          '```tsx\n<CryptoIcon symbol="BTC" size={24} />\n```\n\n' +
          '- Тікер можна передавати будь-яким регістром: `btc` = `BTC`.\n' +
          '- Файл підвантажується лише тоді, коли іконка з’являється на екрані.\n' +
          '- Невідомий тікер → нейтральне коло з літерами, а не порожнє місце.\n' +
          '- За замовчуванням іконка декоративна (поруч стоїть тікер). Якщо вона сама — передай `label`.\n' +
          '- Позначка **Deprecated** — монета неактуальна, не використовуй у нових екранах.' } },
  },
  args: { symbol: 'BTC', size: 40 },
  argTypes: { size: { control: { type: 'range', min: 12, max: 64, step: 4 } } },
} satisfies Meta<typeof CryptoIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Введи код на панелі Controls. Невідомий код → нейтральне коло з літерами. */
export const Playground: Story = {};

export const UnknownCode: Story = {
  name: 'Unknown code (fallback)',
  args: { symbol: 'PEPE' },
};

/** Усі іконки групи. Клацни — скопіюється код компонента. */
export const All: Story = {
  name: 'All crypto',
  parameters: { controls: { disable: true } },
  render: () => (
    <IconGallery
      items={galleryItems('crypto')}
      defaultSize={24}
      sizes={[16, 20, 24, 32, 40]}
      placeholder="Search: BTC, Ethereum, stable…"
      hint={EMPTY_HINT}
    />
  ),
};
