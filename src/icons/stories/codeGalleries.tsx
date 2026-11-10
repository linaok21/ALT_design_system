import { BrandIcon, CryptoIcon, CurrencyIcon, Flag, Illustration } from '../CodeIcons';
import { MANIFEST, type IconGroup } from '../loaders';
import type { GalleryItem } from './IconGallery';

/** Gallery items for coded groups, built from the generated manifest. */
export function galleryItems(group: IconGroup): GalleryItem[] {
  return MANIFEST[group].map((e) => {
    // shared ticker → address the non-primary icon by its file id
    const code = e.file.includes('--') ? e.file : (e.code ?? e.name);
    const base = {
      id: `${group}-${e.file}`,
      title: e.code ?? e.name,
      subtitle: e.code ? e.name : undefined,
      keywords: [e.name, ...(e.aliases ?? [])],
      deprecated: e.deprecated,
    };
    switch (group) {
      case 'crypto':
        return { ...base, snippet: `<CryptoIcon symbol="${code}" />`, render: (s: number) => <CryptoIcon symbol={code} size={s} /> };
      case 'currency':
        return { ...base, snippet: `<CurrencyIcon code="${code}" />`, render: (s: number) => <CurrencyIcon code={code} size={s} /> };
      case 'flags':
        return { ...base, snippet: `<Flag country="${code}" />`, render: (s: number) => <Flag country={code} size={s} /> };
      case 'brand':
        return { ...base, snippet: `<BrandIcon name="${code}" />`, render: (s: number) => <BrandIcon name={code} size={s} /> };
      case 'illustrations':
        return { ...base, snippet: `<Illustration name="${code}" />`, render: (s: number) => <Illustration name={code} size={s} /> };
    }
  });
}

export const EMPTY_HINT = (
  <>
    Клацни на іконку — скопіюється код компонента. Оновити набір з Figma: <code>npm run icons</code> (інструкція в README).
  </>
);
