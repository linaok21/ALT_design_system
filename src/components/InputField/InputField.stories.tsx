import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bitcoin, Eye } from 'lucide-react';
import { InputField, type InputFieldProps } from './InputField';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=41-8759';

const iconLeftOptions = { none: undefined, bitcoin: <Bitcoin /> };
const iconRightOptions = { none: undefined, eye: <Eye /> };

const meta = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Поле для введення сум і значень.\n\n' +
          '**Як стани з Figma працюють у коді**\n' +
          '- **default / filled** — визначаються тим, чи є значення в полі\n' +
          '- **hovered** — CSS `:hover`, наведи курсор\n' +
          '- **typing** — фокус у полі, клацни в нього\n' +
          '- **error** — проп `error`\n' +
          '- **disabled** — проп `disabled`\n\n' +
          '**Варіанти**\n' +
          '- З рамкою — розміри `md` (52px) і `sm` (40px)\n' +
          '- Без рамки (`bordered={false}`) — тільки `md`, велике значення 24px для головної суми\n\n' +
          '`description` (сірий текст після значення, наприклад BTC) з’являється, щойно в полі є значення.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    iconLeft: { control: 'select', options: Object.keys(iconLeftOptions), mapping: iconLeftOptions },
    iconRight: { control: 'select', options: Object.keys(iconRightOptions), mapping: iconRightOptions },
    action: { control: false },
    onChange: { action: 'changed' },
  },
  args: {
    title: 'Title',
    placeholder: 'Text',
    size: 'md',
    bordered: true,
    iconLeft: 'bitcoin' as never,
    iconRight: 'eye' as never,
    suffix: 'MAX',
    action: { label: 'MAX' },
    description: 'Description',
    helperText: 'Helper Text',
    error: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 472 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Змінюй пропси на панелі Controls і вводь текст у поле. */
export const Playground: Story = {};

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'Text' } };
export const ErrorState: Story = { name: 'Error', args: { defaultValue: 'Text', error: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const Borderless: Story = { args: { bordered: false, title: 'Title' } };
export const BorderlessFilled: Story = {
  name: 'Borderless filled',
  args: { bordered: false, defaultValue: 'Text' },
};

/** Реальний приклад: сума в торговій формі. */
export const AmountExample: Story = {
  name: 'Example: order amount',
  args: {
    title: 'Amount',
    label: 'Available: 0.5321 BTC',
    placeholder: '0.00',
    defaultValue: undefined,
    description: 'BTC',
    suffix: undefined,
    iconRight: 'none' as never,
    action: { label: 'MAX' },
    helperText: 'Minimum order 0.0001 BTC',
    inputMode: 'decimal',
  },
};

/* ── Full matrix, same layout as the Figma component set ── */
type Col = { name: string; props: Partial<InputFieldProps> };
const columns: Col[] = [
  { name: 'Border · md', props: { bordered: true, size: 'md' } },
  { name: 'Border · sm', props: { bordered: true, size: 'sm' } },
  { name: 'No border · md', props: { bordered: false, size: 'md' } },
];
const rows: { name: string; props: Partial<InputFieldProps>; hover?: boolean; focus?: boolean }[] = [
  { name: 'Default', props: {} },
  { name: 'Hovered*', props: {}, hover: true },
  { name: 'Typing*', props: { defaultValue: 'Text' }, focus: true },
  { name: 'Filled', props: { defaultValue: 'Text' } },
  { name: 'Error', props: { defaultValue: 'Text', error: true } },
  { name: 'Disabled', props: { disabled: true } },
];

/** Усі варіанти × стани, як у Figma. *Hover і Typing показані статично. */
export const AllStates: Story = {
  name: 'All states (Figma matrix)',
  decorators: [(Story) => <Story />],
  parameters: { layout: 'padded', controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(3, 360px)', gap: '28px 32px', alignItems: 'start' }}>
      <span />
      {columns.map((c) => (
        <span key={c.name} style={{ color: '#8a8d91', font: '600 12px Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '.04em' }}>
          {c.name}
        </span>
      ))}
      {rows.map((r) => [
        <span key={r.name} style={{ color: '#8a8d91', font: '500 12px Inter, sans-serif', paddingTop: 4 }}>
          {r.name}
        </span>,
        ...columns.map((c) => (
          <InputField
            key={r.name + c.name}
            {...args}
            {...c.props}
            {...r.props}
            className={r.hover ? 'force-hover' : r.focus ? 'force-focus' : undefined}
          />
        )),
      ])}
    </div>
  ),
};
