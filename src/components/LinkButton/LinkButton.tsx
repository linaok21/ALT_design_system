import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import styles from './LinkButton.module.css';

export type LinkButtonVariant = 'secondary' | 'primary' | 'danger';

type CommonProps = {
  /** Text of the link. */
  children: ReactNode;
  /** secondary — white, primary — yellow, danger — red. Figma: `role` */
  variant?: LinkButtonVariant;
  /** Icon before the text, e.g. `<Plus />`. Figma: `showIconLeft` */
  iconLeft?: ReactNode;
  /** Icon after the text, e.g. `<ChevronRight />`. Figma: `showIconRight` */
  iconRight?: ReactNode;
  /** Figma: `state=disabled` */
  disabled?: boolean;
  className?: string;
};

export type LinkButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | 'type'> & {
    /** When set, renders a real link (`<a>`); otherwise a button. */
    href?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    rel?: string;
  };

/**
 * Text-only action: "Show all", "Add address", "Delete".
 * Use a link (`href`) for navigation and a button (no `href`) for actions on the page.
 * Hover comes from CSS (text becomes semibold), so there is no `state` prop like in Figma.
 */
export const LinkButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkButtonProps>(function LinkButton(
  { children, variant = 'secondary', iconLeft, iconRight, disabled = false, className, href, target, rel, ...rest },
  ref,
) {
  const cls = [styles.link, styles[variant], disabled && styles.disabled, className].filter(Boolean).join(' ');

  const content = (
    <>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      {/* data-text reserves the semibold width, so hover does not shift the layout */}
      <span className={styles.label} data-text={typeof children === 'string' ? children : undefined}>
        {children}
      </span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </>
  );

  if (href != null) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={cls}
        href={disabled ? undefined : href}
        target={target}
        rel={target === '_blank' ? (rel ?? 'noopener noreferrer') : rel}
        aria-disabled={disabled || undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button ref={ref as Ref<HTMLButtonElement>} type="button" className={cls} disabled={disabled} {...rest}>
      {content}
    </button>
  );
});
