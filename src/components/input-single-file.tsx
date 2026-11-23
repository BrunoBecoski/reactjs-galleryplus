import React from "react";
import { useWatch } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";

import { Icon } from "./icon";
import { Text, textVariants } from "./text";

import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import ImageIcon from "../assets/icons/image.svg?react";

export const inputSingleFileVariants = tv({
  base: "flex flex-col items-center justify-center gap-1 w-full border border-solid border-border-primary rounded-lg group-hover:border-border-active transition",
  variants: {
    size: {
      md: "px-5 py-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const inputSingleFileIconVariants = tv({
  base: "fill-placeholder",
  variants: {
    size: {
      md: "size-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InputSingleFileProps
  extends
    Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputSingleFileVariants> {
  form: any;
  allowedExtensions: string[];
  maxFileSizeInMB: number;
  error?: React.ReactNode;
}

export function InputSingleFile({
  size,
  form,
  allowedExtensions,
  maxFileSizeInMB,
  error,
  ...props
}: InputSingleFileProps) {
  const formValues = useWatch({ control: form.control });

  const name = props.name || "";

  const formFile: File = React.useMemo(
    () => formValues[name]?.[0],
    [formValues, name],
  );

  const { fileExtension, fileSize } = React.useMemo(
    () => ({
      fileExtension:
        formFile?.name?.split(".")?.pop()?.toLocaleLowerCase() || "",
      fileSize: formFile?.size || 0,
    }),
    [formFile],
  );

  function isValidExtension() {
    return allowedExtensions.includes(fileExtension);
  }

  function isValidSize() {
    return fileSize <= maxFileSizeInMB * 1024 * 1024;
  }

  function isValidFile() {
    return isValidExtension() && isValidSize();
  }

  return (
    <div>
      {!formFile || !isValidFile() ? (
        <>
          <div className="w-full relative group cursor-pointer">
            <input
              type="file"
              className="absolute top-0 right-0 size-full opacity-0 cursor-pointer"
              {...props}
            />

            <div className={inputSingleFileVariants({ size })}>
              <Icon
                svg={UploadFileIcon}
                className={inputSingleFileIconVariants({ size })}
              />
              <Text
                variant="label-medium"
                className="text-placeholder text-center"
              >
                Arraste o arquivo aqui <br /> ou clique para selecionar
              </Text>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            {formFile && !isValidExtension() && (
              <Text variant="label-small" className="text-accent-red">
                O tipo de arquivo inválido
              </Text>
            )}

            {formFile && !isValidSize() && (
              <Text variant="label-small" className="text-accent-red">
                O tamanho de arquivo ultrapassa o máximo
              </Text>
            )}

            {error && (
              <Text variant="label-small" className="text-accent-red">
                {error}
              </Text>
            )}
          </div>
        </>
      ) : (
        <div className="flex gap-3 items-center border border-solid border-border-primary rounded mt-5 p-3">
          <Icon svg={ImageIcon} className="fill-white size-6" />
          <div className="flex flex-col">
            <div className="truncate max-w-80">
              <Text variant="label-medium" className="text-placeholder">
                {formFile.name}
              </Text>
            </div>
            <div className="flex">
              <button
                type="button"
                className={textVariants({
                  variant: "label-small",
                  className: "text-accent-red cursor-pointer hover:underline",
                })}
                onClick={() => {
                  form.setValue(name, undefined);
                }}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
