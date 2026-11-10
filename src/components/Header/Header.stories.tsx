import type { Meta, StoryObj } from '@storybook/react-vite';
import { Globe, LogOut, UserRound } from 'lucide-react';
import { Drop } from '../../icons/generated/CustomIcons';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { LinkButton } from '../LinkButton/LinkButton';
import { MenuItem } from '../MenuItem/MenuItem';
import { Header, HeaderNav } from './Header';

const FIGMA = 'https://www.figma.com/design/dht0d62uZR706bGFkrri7B/ALT?node-id=5754-220155';

/* ── Pieces from the Figma variants ── */
const clientNav = (
  <HeaderNav>
    <MenuItem href="#exchange">Exchange</MenuItem>
    <MenuItem href="#buy">Buy crypto</MenuItem>
    <MenuItem hasDropdown>Trade</MenuItem>
    <MenuItem hasDropdown>Markets</MenuItem>
  </HeaderNav>
);
const pairNav = (
  <HeaderNav aria-label="Trading pair">
    <MenuItem hasDropdown>BTC/USDT</MenuItem>
  </HeaderNav>
);
const wallet = (
  <LinkButton iconRight={<Drop color="var(--icon-static-secondary-subdued)" />}>Wallet</LinkButton>
);
const language = <IconButton variant="ghost" size="l" icon={<Globe />} label="Language" />;
const loggedInActions = (
  <>
    <LinkButton href="#support">Support</LinkButton>
    {wallet}
    <IconButton size="m" icon={<UserRound />} label="Profile" />
    {language}
  </>
);
const guestActions = (
  <>
    <LinkButton href="#support">Support</LinkButton>
    <Button variant="secondary" size="md">Log in</Button>
    <Button variant="primary" size="md">Sign up</Button>
    {language}
  </>
);
const adminActions = <LinkButton iconRight={<LogOut />}>Serik_Laskovy</LinkButton>;

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA },
    docs: {
      description: {
        component:
          'Верхня панель сторінки: логотип і головне меню зліва, дії справа.\n\n' +
          'Header лише розкладає вміст. Наповнюй його готовими компонентами: `HeaderNav` + `MenuItem` для меню, ' +
          '`LinkButton`, `Button`, `IconButton` для дій.\n\n' +
          '**Варіанти**\n' +
          '- **client** (64px) — сайт біржі. У Figma три стани:\n' +
          '  - **logged in** — меню розділів + Support, Wallet, профіль, мова\n' +
          '  - **default** (гість) — те саме меню + Log in і Sign up замість гаманця й профілю\n' +
          '  - **analytic** — сторінка торгівлі: замість меню розділів — вибір пари BTC/USDT\n' +
          '- **admin** (58px) — бек-офіс: логотип і імʼя адміністратора з виходом\n\n' +
          '- ✅ Активний розділ позначай `selected` на MenuItem\n' +
          '- ✅ Для іконкових кнопок завжди задавай `label` («Profile», «Language»)\n' +
          '- ❌ Не став у шапку більше одного жовтого Button — тільки Sign up\n' +
          '- ❌ Не додавай у меню більше 5–6 пунктів: решту ховай у випадне меню',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['client', 'admin'] },
    nav: { control: false },
    actions: { control: false },
    logo: { control: false },
  },
  args: {
    variant: 'client',
    nav: clientNav,
    actions: loggedInActions,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: `Header/Client`, state=logged in */
export const LoggedIn: Story = { name: 'Client · Logged in' };

/** Figma: `Header/Client`, state=default — гість ще не увійшов. */
export const Guest: Story = { name: 'Client · Guest', args: { actions: guestActions } };

/** Figma: `Header/Client`, state=analytic — сторінка торгівлі з вибором пари. */
export const Analytic: Story = { name: 'Client · Analytic', args: { nav: pairNav } };

/** Figma: `Header/Admin`. */
export const Admin: Story = { args: { variant: 'admin', nav: undefined, actions: adminActions } };

/** Активний розділ: `selected` на MenuItem. */
export const WithSelectedItem: Story = {
  name: 'Client · Selected section',
  args: {
    nav: (
      <HeaderNav>
        <MenuItem href="#exchange">Exchange</MenuItem>
        <MenuItem href="#buy">Buy crypto</MenuItem>
        <MenuItem hasDropdown selected>Trade</MenuItem>
        <MenuItem hasDropdown>Markets</MenuItem>
      </HeaderNav>
    ),
  },
};

/** Усі варіанти один під одним, як у Figma. */
export const AllStates: Story = {
  name: 'All states (Figma)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 16, padding: '16px 0', background: 'var(--fill-page-back, #0c0d0e)' }}>
      {[
        ['client · logged in', <Header key="l" nav={clientNav} actions={loggedInActions} />],
        ['client · default', <Header key="d" nav={clientNav} actions={guestActions} />],
        ['client · analytic', <Header key="a" nav={pairNav} actions={loggedInActions} />],
        ['admin', <Header key="ad" variant="admin" actions={adminActions} />],
      ].map(([name, node]) => (
        <div key={name as string}>
          <div style={{ color: '#8a8d91', font: '600 12px Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '.04em', padding: '0 32px 8px' }}>
            {name}
          </div>
          {node}
        </div>
      ))}
    </div>
  ),
};
