import type { Meta, StoryObj } from '@storybook/react-vite';
import * as lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LUCIDE_ICONS } from '../lucide-set';
import * as Custom from '../generated/CustomIcons';
import { CUSTOM_ICON_NAMES } from '../generated/CustomIcons';
import { IconGallery, type GalleryItem } from './IconGallery';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220103';
const pascal = (s: string) => s.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');

const meta = {
  title: 'Foundations/Icons/General',
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Загальні іконки інтерфейсу.\n\n' +
          '- **Lucide** — 1 580 іконок з Figma вже є в бібліотеці `lucide-react`, нічого не експортуємо.\n' +
          '- **Власні** — іконок, яких немає в Lucide (`Up`, `UpDown`, `drop`, логотипи сервісів), генерує `npm run icons` з експорту Figma.\n\n' +
          'Клацни на іконку — скопіюється рядок імпорту. Колір береться з тексту (`currentColor`), розмір — проп `size`.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const lucideItems: GalleryItem[] = LUCIDE_ICONS.flatMap((name) => {
  const Comp = (lucide as unknown as Record<string, LucideIcon | undefined>)[pascal(name)];
  if (!Comp) return [];
  return [
    {
      id: name,
      title: name,
      snippet: `import { ${pascal(name)} } from 'lucide-react';`,
      keywords: [pascal(name)],
      render: (size: number) => <Comp size={size} />,
    },
  ];
});

const customItems: GalleryItem[] = CUSTOM_ICON_NAMES.map((name) => {
  const Comp = Custom[name];
  return {
    id: name,
    title: name,
    snippet: `import { ${name} } from 'alt-ui';`,
    render: (size: number) => <Comp size={size} />,
  };
});

/** Іконки з Figma, які беремо з `lucide-react`. */
export const Lucide: Story = {
  render: () => (
    <IconGallery
      items={lucideItems}
      placeholder="Search: arrow, wallet, chart…"
      hint={
        <>
          Використання: <code>{"<ChevronDown size={20} />"}</code>. Назва в Figma <code>Icon / chevron-down</code> →
          компонент <code>ChevronDown</code>.
        </>
      }
    />
  ),
};

/** Власні іконки, яких немає в Lucide. */
export const OwnIcons: Story = {
  name: 'Own icons',
  render: () => (
    <IconGallery
      items={customItems}
      hint={
        <>
          Той самий API, що в Lucide: <code>{'<UpDown size={20} color="…" />'}</code>.
        </>
      }
      emptyText="Власні іконки з’являться після npm run icons."
    />
  ),
};
