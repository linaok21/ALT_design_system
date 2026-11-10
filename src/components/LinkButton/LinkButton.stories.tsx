import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';
import { LinkButton, type LinkButtonVariant } from './LinkButton';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220146';

const iconLeftOptions = { none: undefined, plus: <Plus />, trash: <Trash2 /> };
const iconRightOptions = { none: undefined, 'chevron-right': <ChevronRight /> };

const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Текстова дія без фону: «Показати все», «Додати адресу», «Видалити».\n\n' +
          '**Ролі**\n' +
          '- **secondary** (білий) — звичайні дії\n' +
          '- **primary** (жовтий) — головна дія в блоці, наприклад «MAX» у полі суми\n' +
          '- **danger** (червоний) — видалення, скасування ордера\n\n' +
          '**Посилання чи кнопка?** Передай `href`, якщо дія веде на іншу сторінку, — тоді це справжнє посилання. ' +
          'Без `href` це кнопка для дії на поточній сторінці.\n\n' +
          '**Стани.** Hover — текст стає напівжирним, ширина не змінюється. Focus — жовта обводка при навігації клавішею Tab. ' +
          'Disabled — усі ролі однаково сірі.\n\n' +
          '**Коли що використовувати**\n' +
          '- ✅ chevron-right — дія відкриває новий екран; plus — щось додає\n' +
          '- ❌ Не використовуй як головний CTA екрана — для цього Button\n' +
          '- ❌ Не більше одного primary в одному блоці\n' +
          '- ❌ Не став два Link Button впритул: між ними мінімум 16px\n' +
          '- Текст має описувати дію без контексту: «Скасувати ордер», а не «Тут».',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['secondary', 'primary', 'danger'] },
    iconLeft: { control: 'select', options: Object.keys(iconLeftOptions), mapping: iconLeftOptions },
    iconRight: { control: 'select', options: Object.keys(iconRightOptions), mapping: iconRightOptions },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Link',
    variant: 'secondary',
    disabled: false,
    iconLeft: 'plus' as never,
    iconRight: 'chevron-right' as never,
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Змінюй пропси на панелі Controls. */
export const Playground: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };
export const Primary: Story = { args: { variant: 'primary' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Disabled: Story = { args: { disabled: true } };
export const TextOnly: Story = {
  name: 'Text only',
  args: { iconLeft: 'none' as never, iconRight: 'none' as never, children: 'Show all' },
};
/** З `href` рендериться справжнє посилання `<a>`. */
export const AsLink: Story = {
  name: 'As link (href)',
  args: { href: '#markets', children: 'All markets', iconLeft: 'none' as never },
};

/* ── Full matrix, same layout as the Figma component set ── */
const variants: LinkButtonVariant[] = ['secondary', 'danger', 'primary'];
const cols = ['Default', 'Hover*', 'Disabled', 'Focus*'];

/** Усі ролі × стани, як у Figma. *Hover і Focus показано статично; справжній фокус — клавішею Tab. */
export const AllStates: Story = {
  name: 'All states (Figma matrix)',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(4, max-content)', gap: '20px 32px', alignItems: 'center' }}>
      <span />
      {cols.map((c) => (
        <span key={c} style={{ color: '#8a8d91', font: '600 12px Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '.04em' }}>{c}</span>
      ))}
      {variants.map((v) => {
        const common = { variant: v, iconLeft: <Plus />, iconRight: <ChevronRight />, children: 'Link' };
        return [
          <span key={v} style={{ color: '#8a8d91', font: '500 12px Inter, sans-serif' }}>{v}</span>,
          <LinkButton key={`${v}d`} {...common} />,
          <LinkButton key={`${v}h`} {...common} className="force-hover" />,
          <LinkButton key={`${v}x`} {...common} disabled />,
          <LinkButton key={`${v}f`} {...common} className="force-focus" />,
        ];
      })}
    </div>
  ),
};

/** Реальні приклади з біржі. */
export const Examples: Story = {
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 16, font: '14px Inter, sans-serif', color: '#b5b5b5', width: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 600 }}>Open orders</span>
        <LinkButton href="#orders" iconRight={<ChevronRight />}>
          View all
        </LinkButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Withdrawal addresses</span>
        <LinkButton variant="primary" iconLeft={<Plus />}>
          Add address
        </LinkButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>BTC/USDT · Limit · 0.25</span>
        <LinkButton variant="danger">Cancel order</LinkButton>
      </div>
    </div>
  ),
};
