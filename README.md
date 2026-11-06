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
