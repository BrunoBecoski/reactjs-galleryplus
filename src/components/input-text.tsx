import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { Icon } from "./icon";
import { Text } from "./text";

export const inputTextContainerVariants = tv({
  base: "flex flex-col gap-1",
});

export const inputTextWrapperVariants = tv({
  base: "border border-solid border-border-primary bg-transparent rounded flex items-center gap-3 focus-within:border-border-active cursor-text",
  variants: {
    size: {
      md: "h-10 p-3",
    },
    disabled: {
      true: "pointer-event-none cursor-not-allowed",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export const inputTextVariants = tv({
  base: "bg-transparent outline-none text-accent-paragraph placeholder:text-placeholder flex-1",
  variants: {
    disabled: {
      true: "cursor-not-allowed",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const inputTextIconVariants = tv({
  base: "fill-placeholder",
  variants: {
    size: {
      md: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputTextProps
  extends
    Omit<React.ComponentProps<"input">, "size" | "disabled">,
    VariantProps<typeof inputTextWrapperVariants> {
  icon?: React.ComponentProps<typeof Icon>["svg"];
  error?: React.ReactNode;
}

export function InputText({
  size,
  disabled,
  className,
  icon,
  error,
  ...props
}: InputTextProps) {
  return (
    <div className={inputTextContainerVariants({ className })}>
      <label className={inputTextWrapperVariants({ size, disabled })}>
        {icon && (
          <Icon svg={icon} className={inputTextIconVariants({ size })} />
        )}

        <input
          className={inputTextVariants({ disabled })}
          disabled={disabled as boolean}
          {...props}
        />
      </label>

      {error && (
        <Text variant="label-small" className="text-accent-red">
          {error}
        </Text>
      )}
    </div>
  );
}
