import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem, type MenuItemProps } from './MenuItem';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=32-979';

const meta = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Пункт верхнього навігаційного меню.\n\n' +
          '**Як стани з Figma працюють у коді**\n' +
          '- **Default** — без пропсів\n' +
          '- **hover** — CSS, наведи курсор\n' +
          '- **disabled** — проп `disabled`\n' +
          '- **Selected** — проп `selected` (поточний розділ); стрілка вгору — `open` (підменю відкрите)\n\n' +
          'Стрілка показується з `hasDropdown`. Якщо передати `href`, пункт стає посиланням, інакше це кнопка. ' +
          'Ширина пункту не змінюється, коли текст стає жирним.',
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Menu Item',
    hasDropdown: true,
    selected: false,
    open: false,
    disabled: false,
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Змінюй пропси на панелі Controls. */
export const Playground: Story = {};

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Selected: Story = { args: { selected: true, open: true } };
export const WithoutDropdown: Story = { name: 'Without dropdown', args: { hasDropdown: false } };

/* ── Full matrix, same layout as the Figma component set ── */
const states: { name: string; props: Partial<MenuItemProps> }[] = [
  { name: 'Default', props: {} },
  { name: 'Hover*', props: { className: 'force-hover' } },
  { name: 'Disabled', props: { disabled: true } },
  { name: 'Selected', props: { selected: true, open: true } },
];

/** Усі стани, як у Figma. *Hover показано статично. */
export const AllStates: Story = {
  name: 'All states (Figma matrix)',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '90px max-content', gap: '20px 32px', alignItems: 'center' }}>
      {states.map((s) => [
        <span key={s.name + 'l'} style={{ color: '#8a8d91', font: '500 12px Inter, sans-serif' }}>
          {s.name}
        </span>,
        <MenuItem key={s.name} {...args} {...s.props} />,
      ])}
    </div>
  ),
};

/** Реальний приклад: меню в шапці біржі. Клацай пункти — вибір перемикається без «стрибків» ширини. */
export const NavigationExample: Story = {
  name: 'Example: header navigation',
  parameters: { layout: 'padded', controls: { disable: true } },
  render: function Render() {
    const items = [
      { label: 'Markets', dropdown: false },
      { label: 'Trade', dropdown: true },
      { label: 'Derivatives', dropdown: true },
      { label: 'Earn', dropdown: true },
      { label: 'Launchpad', dropdown: false, disabled: true },
    ];
    const [active, setActive] = useState('Trade');
    const [openItem, setOpenItem] = useState<string | null>(null);
    return (
      <nav aria-label="Main" style={{ display: 'flex', gap: 4 }}>
        {items.map((it) => (
          <MenuItem
            key={it.label}
            hasDropdown={it.dropdown}
            disabled={it.disabled}
            selected={active === it.label}
            open={openItem === it.label}
            onClick={() => {
              setActive(it.label);
              setOpenItem(it.dropdown && openItem !== it.label ? it.label : null);
            }}
          >
            {it.label}
          </MenuItem>
        ))}
      </nav>
    );
  },
};
