# ALT UI Kit — Storybook

Компоненти з Figma-файлу **ALT**, перенесені в код (React + TypeScript + CSS Modules) і задокументовані в Storybook.

## Запуск
```bash
npm install
npm run storybook        # http://localhost:6006
npm run build-storybook  # статична збірка в storybook-static/
```

## Структура
```
src/
  tokens/tokens.css              ← змінні з Figma (--group-sub-name)
  components/Button/
    Button.tsx                   ← компонент
    Button.module.css            ← стилі тільки через токени
    Button.stories.tsx           ← історії + документація
.storybook/                      ← конфіг, тема, шрифт Inter
```

## Відповідність Figma → код (Button)
| Figma            | Код                          |
|------------------|------------------------------|
| role             | `variant`                    |
| size             | `size` (`lg` / `md` / `sm`)  |
| state=hover/active | CSS `:hover` / `:active`   |
| state=loading    | `loading`                    |
| state=disabled   | `disabled`                   |
| showIconLeft/Right | `iconLeft` / `iconRight` (будь-яка іконка) |

Іконки — бібліотека [lucide](https://lucide.dev) (`smile`, `loader-circle`), та сама, що в Figma.

Посилання на макет у кожній історії: вкладка **Design**.

## Автодеплой у Chromatic
Workflow `.github/workflows/chromatic.yml` публікує Storybook у Chromatic після кожного push у `main` і для кожного Pull Request.

Один раз потрібно додати секрет у GitHub: **Settings → Secrets and variables → Actions → New repository secret**, назва `CHROMATIC_PROJECT_TOKEN`, значення — токен проєкту з Chromatic (**Manage → Configure**).

Публічний Storybook (остання версія `main`): https://main--6aede6d6d89a44a42d131a8d.chromatic.com
