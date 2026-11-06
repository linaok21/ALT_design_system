import type { Meta, StoryObj } from '@storybook/react-vite';
import { Smile } from 'lucide-react';
import { Button, type ButtonRole, type ButtonSize } from './Button';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=26-937';

const iconOptions = { none: undefined, smile: <Smile /> };

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Базовий інтерактивний елемент для ключових дій.\n\n' +
          '**Використання**\n' +
          '- ✅ Один Primary на екран\n' +
          '- ✅ Buy/Sell — тільки для торгових операцій\n' +
          '- ✅ L — для головних CTA, M — для вторинних дій\n' +
          '- ✅ Disabled, коли дія недоступна\n' +
          '- ❌ Не використовуй Buy/Sell для не-торгових дій\n' +
          '- ❌ Не змінюй кольори вручну — тільки через токени\n\n' +
          'Hover і Active беруться з CSS, а не з пропса: наведи курсор на кнопку.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'buy', 'sell'] },
    size: { control: 'inline-radio', options: ['lg', 'md', 'sm'] },
    iconLeft: { control: 'select', options: Object.keys(iconOptions), mapping: iconOptions },
    iconRight: { control: 'select', options: Object.keys(iconOptions), mapping: iconOptions },
    onClick: { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Label',
    loading: false,
    disabled: false,
    iconLeft: 'smile' as never,
    iconRight: 'smile' as never,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Змінюй пропси на панелі Controls. */
export const Playground: Story = {};

export const Primary: Story = { args: { variant: 'primary', children: 'Label' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Apple' } };
export const Buy: Story = { args: { variant: 'buy', children: 'Buy' } };
export const Sell: Story = { args: { variant: 'sell', children: 'Sell' } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const TextOnly: Story = {
  name: 'Text only',
  args: { iconLeft: 'none' as never, iconRight: 'none' as never, children: 'Place order' },
};

/* ── Full matrix, same layout as the Figma component set ── */
const rows: { variant: ButtonRole; size: ButtonSize; label: string }[] = [
  { variant: 'primary', size: 'lg', label: 'Label' },
  { variant: 'primary', size: 'md', label: 'Label' },
  { variant: 'primary', size: 'sm', label: 'Label' },
  { variant: 'secondary', size: 'lg', label: 'Apple' },
  { variant: 'secondary', size: 'md', label: 'Apple' },
  { variant: 'secondary', size: 'sm', label: 'Apple' },
  { variant: 'buy', size: 'lg', label: 'Buy' },
  { variant: 'buy', size: 'md', label: 'Buy' },
  { variant: 'sell', size: 'lg', label: 'Sell' },
  { variant: 'sell', size: 'md', label: 'Sell' },
];
const cols = ['Default', 'Hover / Active*', 'Loading', 'Disabled'];

/** Усі ролі × розміри × стани, як у Figma. *Hover показано статично через клас. */
export const AllStates: Story = {
  name: 'All states (Figma matrix)',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(4, max-content)', gap: '20px 24px', alignItems: 'center', justifyItems: 'start' }}>
      <span />
      {cols.map((c) => (
        <span key={c} style={{ color: '#8a8d91', font: '600 12px Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '.04em' }}>{c}</span>
      ))}
      {rows.map((r) => {
        const common = { variant: r.variant, size: r.size, iconLeft: <Smile />, iconRight: <Smile />, children: r.label };
        return [
          <span key={`${r.variant}${r.size}`} style={{ color: '#8a8d91', font: '500 12px Inter, sans-serif' }}>{r.variant} · {r.size}</span>,
          <Button key="d" {...common} />,
          <Button key="h" {...common} className="force-hover" />,
          <Button key="l" {...common} loading />,
          <Button key="x" {...common} disabled />,
        ];
      })}
    </div>
  ),
};
