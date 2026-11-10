import { forwardRef, type ReactNode, type SVGProps } from 'react';

export interface CustomIconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Width and height in px. Same default as Lucide. */
  size?: number | string;
  /** Icon color. Defaults to the current text color, like Lucide. */
  color?: string;
}

/**
 * Wraps an own (non-Lucide) icon so it has the same API as Lucide icons:
 * `<Up size={20} color="..." />`, decorative by default, `aria-label` makes it meaningful.
 */
export function createCustomIcon(displayName: string, viewBox: string, children: ReactNode) {
  const Icon = forwardRef<SVGSVGElement, CustomIconProps>(function Icon(
    { size = 24, color = 'currentColor', style, ...rest },
    ref,
  ) {
    const labelled = rest['aria-label'] != null || rest['aria-labelledby'] != null;
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        style={{ color, ...style }}
        aria-hidden={labelled ? undefined : true}
        role={labelled ? 'img' : undefined}
        focusable="false"
        {...rest}
      >
        {children}
      </svg>
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
