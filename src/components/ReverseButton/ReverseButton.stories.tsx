import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type CSSProperties } from 'react';
import { ReverseButton } from './ReverseButton';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220122';

const meta = {
  title: 'Components/ReverseButton',
  component: ReverseButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Жовта квадратна кнопка, що міняє місцями два поля: «Віддаю ⇅ Отримую» у формах обміну та конвертації.\n\n' +
          'Стоїть на межі між полями. Товста темна рамка 6px «вирізає» її з полів, тому кнопку кладуть поверх стику.\n\n' +
          '**Стани**\n' +
          '- **Default** — темні стрілки\n' +
          '- **Loading** (`loading`) — спінер замість стрілок, поки перераховується курс. Клік заблокований\n' +
          '- **Disabled** — сірі стрілки, фон лишається жовтим\n' +
          '- Hover і Focus — у Figma їх немає, у коді додано (hover — жовтий з кнопки primary, focus — жовта обводка при Tab)\n\n' +
          '`label` — назва для екранного читача, за замовчуванням «Swap». Краще конкретно: «Swap currencies».\n\n' +
          '- ✅ Використовуй між двома полями, які можна поміняти місцями\n' +
          '- ❌ Не використовуй як звичайну кнопку з іконкою — для цього IconButton\n' +
          '- ❌ Не став поза стиком полів: без них рамка виглядає зайвою',
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: {
    label: 'Swap',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof ReverseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Змінюй пропси на панелі Controls. */
export const Playground: Story = {};

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

const cols = ['Default', 'Loading', 'Disabled', 'Hover*', 'Focus*'];

/** Усі стани, як у Figma. *Hover і Focus показано статично — у Figma їх немає. */
export const AllStates: Story = {
  name: 'All states (Figma matrix)',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 80px)', gap: '20px 16px', alignItems: 'center', justifyItems: 'center', padding: 12 }}>
      {cols.map((c) => (
        <span key={c} style={{ color: '#8a8d91', font: '600 12px Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '.04em' }}>{c}</span>
      ))}
      <ReverseButton />
      <ReverseButton loading />
      <ReverseButton disabled />
      <ReverseButton className="force-hover" />
      <ReverseButton className="force-focus" />
    </div>
  ),
};

const field: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  borderRadius: 12,
  background: '#232629',
  color: '#fff',
  font: '600 16px Inter, sans-serif',
};
const caption: CSSProperties = { color: '#8a8d91', font: '500 12px Inter, sans-serif', marginBottom: 6 };

/** Реальний приклад: форма обміну. Натисни кнопку — валюти поміняються місцями. */
export const Example: Story = {
  name: 'Example: exchange form',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: function ExchangeForm() {
    const [pair, setPair] = useState<[string, string]>(['USDT', 'BTC']);
    const [loading, setLoading] = useState(false);
    const swap = () => {
      setLoading(true);
      setTimeout(() => {
        setPair(([a, b]) => [b, a]);
        setLoading(false);
      }, 700);
    };
    return (
      <div style={{ position: 'relative', display: 'grid', gap: 4, width: 340 }}>
        <div style={field}>
          <div>
            <div style={caption}>You give</div>1 000
          </div>
          {pair[0]}
        </div>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <ReverseButton label="Swap currencies" loading={loading} onClick={swap} />
        </div>
        <div style={field}>
          <div>
            <div style={caption}>You get</div>≈ 0.0102
          </div>
          {pair[1]}
        </div>
      </div>
    );
  },
};
