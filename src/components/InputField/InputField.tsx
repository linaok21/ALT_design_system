import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { CircleAlert } from 'lucide-react';
import styles from './InputField.module.css';

export type InputFieldSize = 'md' | 'sm';

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'title'> {
  /** Title above the field. Figma: `showTitle` + "Title" */
  title?: ReactNode;
  /** Secondary text on the right of the title. Figma: `showLabel` + "Label" */
  label?: ReactNode;
  /** md — 52px (borderless 42px), sm — 40px. Figma: `Size` */
  size?: InputFieldSize;
  /** With or without the outline. Borderless exists only in md (large 24px value). Figma: `Border` */
  bordered?: boolean;
  /** Icon before the value, e.g. a coin. Figma: `showIconLeft` */
  iconLeft?: ReactNode;
  /** Icon after the right content, e.g. show/hide. Figma: `showIconRight` */
  iconRight?: ReactNode;
  /** Grey text right after the value, e.g. a unit. Appears once the field has a value. Figma: `showDescription` */
  description?: ReactNode;
  /** Static grey text on the right, e.g. a currency. Figma: `showRightText` */
  suffix?: ReactNode;
  /** Yellow link button on the right, e.g. "MAX". Figma: `showRightLink` */
  action?: { label: ReactNode; onClick?: () => void };
  /** Text under the field. Figma: `showHelperText` */
  helperText?: ReactNode;
  /** Error state: red outline and red helper text. Figma: `State=error` */
  error?: boolean;
}

/**
 * Text field for amounts and values.
 * Hover and typing (focus) come from CSS, "filled" from having a value —
 * so there is no `state` prop like in Figma; only `error` and `disabled`.
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    title,
    label,
    size = 'md',
    bordered = true,
    iconLeft,
    iconRight,
    description,
    suffix,
    action,
    helperText,
    error = false,
    disabled = false,
    className,
    id,
    placeholder = ' ',
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  // Clicking anywhere in the field (except the action button) focuses the input
  const focusInput = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || (e.target as HTMLElement).closest('button, input')) return;
    e.preventDefault();
    inputRef.current?.focus();
  };

  const cls = [
    styles.root,
    styles[size],
    bordered ? styles.bordered : styles.borderless,
    error && styles.error,
    disabled && styles.disabled,
    description && styles.withDescription,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls}>
      {(title || label) && (
        <div className={styles.titleRow}>
          {title && (
            <label className={styles.title} htmlFor={inputId}>
              {title}
            </label>
          )}
          {label && <span className={styles.label}>{label}</span>}
        </div>
      )}

      <div className={styles.control} onMouseDown={focusInput}>
        <div className={styles.left}>
          {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
          <input
            ref={inputRef}
            id={inputId}
            className={styles.input}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={error || undefined}
            aria-describedby={helperId}
            {...rest}
          />
          {description && <span className={styles.description}>{description}</span>}
        </div>

        {(suffix || action || iconRight) && (
          <div className={styles.right}>
            {suffix && <span className={styles.suffix}>{suffix}</span>}
            {action && (
              <button
                type="button"
                className={styles.action}
                onClick={action.onClick}
                disabled={disabled}
              >
                {action.label}
              </button>
            )}
            {iconRight && <span className={styles.icon}>{iconRight}</span>}
          </div>
        )}
      </div>

      {helperText && (
        <div className={styles.helper} id={helperId}>
          <CircleAlert className={styles.helperIcon} aria-hidden />
          <span>{helperText}</span>
        </div>
      )}
    </div>
  );
});
