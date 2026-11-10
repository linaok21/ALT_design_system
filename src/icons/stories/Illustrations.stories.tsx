import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconGallery } from './IconGallery';
import { galleryItems } from './codeGalleries';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220103';

const meta = {
  title: 'Foundations/Illustrations',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Ілюстрації 64px для порожніх станів і блоків з перевагами, а також кольорові логотипи брендів.\n\n' +
          '```tsx\n<Illustration name="Security" />\n<BrandIcon name="google" size={24} />\n```',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const notYet = 'З’являться після експорту з Figma і команди npm run icons.';

/** 32 ілюстрації: Access, Security, Reports… */
export const Illustrations: Story = {
  render: () => (
    <IconGallery items={galleryItems('illustrations')} sizes={[48, 64, 96]} defaultSize={64} emptyText={notYet} />
  ),
};

/** Кольорові логотипи: google, apple, dashboard 1–3. */
export const Brands: Story = {
  render: () => <IconGallery items={galleryItems('brand')} sizes={[16, 24, 32]} defaultSize={24} emptyText={notYet} />,
};
