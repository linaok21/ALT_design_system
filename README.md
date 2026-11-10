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

## Іконки
| Група | Як використовувати | Звідки |
|---|---|---|
| Загальні | `import { ChevronDown } from 'lucide-react'` | бібліотека Lucide, нічого не експортуємо |
| Власні (`Up`, `UpDown`, `Drop`, логотипи сервісів) | `import { UpDown } from 'alt-ui'` | генерується з Figma |
| Криптовалюти | `<CryptoIcon symbol="BTC" />` | генерується з Figma |
| Валюти | `<CurrencyIcon code="UAH" />` | генерується з Figma |
| Прапори | `<Flag country="UA" />` | генерується з Figma |
| Бренди, ілюстрації | `<BrandIcon name="google" />`, `<Illustration name="Security" />` | генерується з Figma |

### Оновити іконки з Figma
1. У Figma: **File → Export…** (`Ctrl + Shift + E`). Потрібні шари вже мають налаштування SVG — натисни **Export** і збережи архів.
2. Розпакуй архів у папку `figma-export/` у корені проєкту (вона не потрапляє в Git).
3. `npm run icons` — скрипт оптимізує SVG, розкладе їх у `src/assets/icons/` і перегенерує `src/icons/generated/`.

Не редагуй файли в `src/icons/generated/` і `src/assets/icons/` вручну — вони перезаписуються.
Позначки «Deprecated» і додаткові назви для пошуку — у `scripts/icons/overrides.json`.
