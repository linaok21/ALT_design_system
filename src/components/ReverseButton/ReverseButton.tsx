import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { LoaderCircle } from 'lucide-react';
import styles from './ReverseButton.module.css';

/** Figma icon "Arrows/sort-two": up arrow on the left, down arrow on the right. */
function SortTwoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 3v18M9.5 3l-6 6M14.5 3.05v18M14.5 21.05l6-6" />
    </svg>
  );
}

export interface ReverseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * What the button does, read by screen readers and shown as a tooltip.
   * Default: "Swap". Better: "Swap currencies", "Swap from and to".
   */
  label?: string;
  /** Shows a spinner instead of the arrows and blocks clicks while the swap is calculated. Figma: `state=loading` */
  loading?: boolean;
}

/**
 * Square yellow button that swaps two fields: "From ⇅ To" in exchange and convert forms.
 * Sits on the border between the two fields; the thick dark rim cuts it out of them.
 */
export const ReverseButton = forwardRef<HTMLButtonElement, ReverseButtonProps>(function ReverseButton(
  { label = 'Swap', loading = false, disabled, className, type = 'button', title, ...rest },
  ref,
) {
  const cls = [styles.button, loading && styles.loading, className].filter(Boolean).join(' ');
  return (
    <button
      ref={ref}
      type={type}
      className={cls}
      aria-label={label}
      title={title ?? label}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {loading ? <LoaderCircle /> : <SortTwoIcon />}
      </span>
    </button>
  );
});
