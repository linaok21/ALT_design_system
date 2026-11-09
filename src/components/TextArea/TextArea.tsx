import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { CircleAlert } from 'lucide-react';
import styles from './TextArea.module.css';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'title'> {
  /** Title above the field. Figma: `showTitle` */
  title?: ReactNode;
  /** Text under the field. Figma: `showHelperText` */
  helperText?: ReactNode;
  /** Error state: red outline and red helper text. Figma: `state=error` */
  error?: boolean;
  /** Character limit. When set, the counter "60/200" is shown in the corner. */
  maxLength?: number;
  /** Hide the counter even when `maxLength` is set. */
  hideCounter?: boolean;
}

/**
 * Multi-line field for comments and notes.
 * "default" / "filled" come from having a value; hover and focus from CSS;
 * only `error` and `disabled` are props.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    title,
    helperText,
    error = false,
    disabled = false,
    maxLength,
    hideCounter = false,
    className,
    id,
    value,
    defaultValue,
    onChange,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const counterId = `${fieldId}-counter`;

  // Counter works for both controlled (value) and uncontrolled (defaultValue) use
  const [innerLength, setInnerLength] = useState(String(defaultValue ?? '').length);
  const length = value != null ? String(value).length : innerLength;
  const showCounter = maxLength != null && !hideCounter;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInnerLength(e.target.value.length);
    onChange?.(e);
  };

  const cls = [styles.root, error && styles.error, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls}>
      {title && (
        <label className={styles.title} htmlFor={fieldId}>
          {title}
        </label>
      )}

      <div className={styles.control}>
        <textarea
          ref={ref}
          id={fieldId}
          className={styles.textarea}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={error || undefined}
          aria-describedby={[helperId, showCounter ? counterId : undefined].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
        {showCounter && (
          <span className={styles.counter} id={counterId} aria-live="polite">
            {length}/{maxLength}
          </span>
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
