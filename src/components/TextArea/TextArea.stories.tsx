import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea, type TextAreaProps } from './TextArea';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=57-11010';

const LONG_TEXT =
  'Bought on the breakout above the daily resistance. Stop below the last swing low, ' +
  'target at the previous high. Reduce size if funding turns negative. Re-check the setup ' +
  'after the CPI release and move the stop to break-even once the first target is hit.';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Багаторядкове поле для коментарів і нотаток.\n\n' +
          '**Як стани з Figma працюють у коді**\n' +
          '- **default / filled** — визначаються тим, чи є текст у полі\n' +
          '- **error** — проп `error`\n' +
          '- **disabled** — проп `disabled`\n' +
          '- **hover / focus** — CSS (у Figma цих станів немає, додано для узгодженості з Input Field)\n\n' +
          'Лічильник символів `60/200` з’являється, коли задано `maxLength`, і рахує сам. ' +
          'Довгий текст прокручується всередині поля тонким скролбаром.',
      },
    },
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
  args: {
    title: 'Title',
    placeholder: 'Write your comment',
    maxLength: 200,
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Змінюй пропси на панелі Controls і вводь текст у поле — лічильник оновлюється. */
export const Playground: Story = {};

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'Text' } };
export const ErrorState: Story = {
  name: 'Error',
  args: { defaultValue: 'Write your comment', error: true, helperText: 'Comment is too short' },
};
export const Disabled: Story = { args: { disabled: true } };
export const LongText: Story = {
  name: 'Long text (scroll)',
  args: { defaultValue: LONG_TEXT, maxLength: 300 },
};
export const WithoutCounter: Story = {
  name: 'Without counter',
  args: { maxLength: undefined },
};

/* ── Full matrix, same layout as the Figma component set ── */
const states: { name: string; props: Partial<TextAreaProps> }[] = [
  { name: 'Default', props: {} },
  { name: 'Filled', props: { defaultValue: 'Text' } },
  { name: 'Error', props: { defaultValue: 'Write your comment', error: true } },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'Focus*', props: { defaultValue: 'Text', className: 'force-focus' } },
];

/** Усі стани, як у Figma. *Focus — додатковий стан, показаний статично. */
export const AllStates: Story = {
  name: 'All states (Figma matrix)',
  decorators: [(Story) => <Story />],
  parameters: { layout: 'padded', controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 472px', gap: '28px 32px', alignItems: 'start' }}>
      {states.map((s) => [
        <span key={s.name + 'l'} style={{ color: '#8a8d91', font: '500 12px Inter, sans-serif', paddingTop: 4 }}>
          {s.name}
        </span>,
        <TextArea key={s.name} {...args} {...s.props} />,
      ])}
    </div>
  ),
};
