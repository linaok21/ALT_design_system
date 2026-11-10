import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpDown, ChevronsLeftRight, Copy, Settings, X } from 'lucide-react';
import { IconButton, type IconButtonProps } from './IconButton';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220140';

const iconOptions = {
  'chevrons-left-right': <ChevronsLeftRight />,
  x: <X />,
  'arrow-up-down': <ArrowUpDown />,
  copy: <Copy />,
  settings: <Settings />,
};

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Кнопка лише з іконкою: закрити, поміняти місцями, розгорнути.\n\n' +
          '**Ролі**\n' +
          '- **secondary** — кругла кнопка з ефектом скла. Розміри: `l` 74px, `m` 42px, `s` 32px\n' +
          '- **ghost** — лише іконка без фону: закрити модалку чи тост. Розміри: `l` 40px, `m` 34px\n\n' +
          '**`label` обовʼязковий.** Іконка сама нічого не каже екранному читачу, тому `label` стає назвою кнопки ' +
          '(«Закрити», «Поміняти валюти») і підказкою при наведенні.\n\n' +
          '- ✅ Використовуй, коли дія очевидна з іконки: ✕, ⇄, копіювати\n' +
          '- ❌ Не використовуй для головної дії екрана — для цього Button з текстом\n' +
          '- ❌ Не став поруч кілька однакових іконок з різними діями',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['l', 'm', 's'] },
    icon: { control: 'select', options: Object.keys(iconOptions), mapping: iconOptions },
    onClick: { action: 'clicked' },
  },
  args: {
    icon: 'chevrons-left-right' as never,
    label: 'Swap',
    variant: 'secondary',
    size: 'm',
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Змінюй пропси на панелі Controls. */
export const Playground: Story = {};

export const SecondaryLarge: Story = { name: 'Secondary · L', args: { size: 'l' } };
export const SecondaryMedium: Story = { name: 'Secondary · M', args: { size: 'm' } };
export const SecondarySmall: Story = { name: 'Secondary · S', args: { size: 's' } };
export const Ghost: Story = { args: { variant: 'ghost', size: 'l', icon: 'x' as never, label: 'Close' } };
export const Disabled: Story = { args: { disabled: true } };

/* ── Full matrix, same layout as the Figma component set ── */
const rows: { name: string; props: Pick<IconButtonProps, 'variant' | 'size' | 'icon' | 'label'> }[] = [
  { name: 'secondary · l', props: { variant: 'secondary', size: 'l', icon: <ChevronsLeftRight />, label: 'Swap' } },
  { name: 'secondary · m', props: { variant: 'secondary', size: 'm', icon: <ChevronsLeftRight />, label: 'Swap' } },
  { name: 'secondary · s', props: { variant: 'secondary', size: 's', icon: <ChevronsLeftRight />, label: 'Swap' } },
  { name: 'ghost · l', props: { variant: 'ghost', size: 'l', icon: <X />, label: 'Close' } },
  { name: 'ghost · m', props: { variant: 'ghost', size: 'm', icon: <X />, label: 'Close' } },
];

/** Усі ролі × розміри × стани, як у Figma. *Focus показано статично — у Figma цього стану немає. */
export const AllStates: Story = {
  name: 'All states (Figma matrix)',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '110px repeat(3, 96px)', gap: '20px 16px', alignItems: 'center', justifyItems: 'start' }}>
      <span />
      {['Default', 'Disabled', 'Focus*'].map((c) => (
        <span key={c} style={{ color: '#8a8d91', font: '600 12px Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '.04em' }}>{c}</span>
      ))}
      {rows.map((r) => [
        <span key={r.name} style={{ color: '#8a8d91', font: '500 12px Inter, sans-serif' }}>{r.name}</span>,
        <IconButton key={`${r.name}d`} {...r.props} />,
        <IconButton key={`${r.name}x`} {...r.props} disabled />,
        <IconButton key={`${r.name}f`} {...r.props} className="force-focus" />,
      ])}
    </div>
  ),
};

/** Реальні приклади: обмін валют, закриття тосту, дії в рядку таблиці. */
export const Examples: Story = {
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 24, font: '14px Inter, sans-serif', color: '#b5b5b5', width: 360 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ flex: 1, color: '#fff' }}>USDT</span>
        <IconButton icon={<ArrowUpDown />} label="Swap currencies" size="m" />
        <span style={{ flex: 1, textAlign: 'right', color: '#fff' }}>BTC</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 8px 12px 16px', borderRadius: 12, background: '#26282d' }}>
        <span style={{ flex: 1, color: '#fff' }}>Order placed</span>
        <IconButton icon={<X />} label="Close notification" variant="ghost" size="m" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 1 }}>0x7a2f…91c3</span>
        <IconButton icon={<Copy />} label="Copy address" size="s" />
        <IconButton icon={<Settings />} label="Address settings" size="s" />
      </div>
    </div>
  ),
};
