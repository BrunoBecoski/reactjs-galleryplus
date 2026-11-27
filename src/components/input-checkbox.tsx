import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { Icon } from "./icon";

import CheckIcon from "../assets/icons/check.svg?react";

export const inputCheckboxWrapperVariants = tv({
  base: "inline-flex items-center justify-center relative group has-disabled:cursor-not-allowed not-disabled:cursor-pointer",
});

export const inputCheckboxVariants = tv({
  base: "appearance-none peer flex items-center justify-center transition overflow-hidden",
  variants: {
    variant: {
      default:
        "border-2 border-solid border-border-primary not-disabled:hover:border-border-active not-disabled:checked:border-accent-brand not-disabled:checked:bg-accent-brand not-disabled:group-hover:checked:border-accent-brand-light not-disabled:group-hover:checked:bg-accent-brand-light cursor-pointer",
    },
    size: {
      sm: "size-3 rounded-sm",
      md: "size-5 rounded-sm",
    },
    disabled: {
      true: "pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
  },
});

export const inputCheckboxIconVariants = tv({
  base: "absolute top-1/2 -translate-y-1/2 hidden peer-checked:block fill-white",
  variants: {
    size: {
      sm: "size-3",
      md: "size-5",
    },
  },
});

interface InputCheckboxProps
  extends
    Omit<React.ComponentProps<"input">, "size" | "disabled">,
    VariantProps<typeof inputCheckboxVariants> {}

export function InputCheckbox({
  variant,
  size,
  disabled,
  className,
  ...props
}: InputCheckboxProps) {
  return (
    <label className={inputCheckboxWrapperVariants({ className })}>
      <input
        type="checkbox"
        className={inputCheckboxVariants({ variant, size, disabled })}
        disabled={disabled as boolean}
        {...props}
      />
      <Icon svg={CheckIcon} className={inputCheckboxIconVariants({ size })} />
    </label>
  );
}
