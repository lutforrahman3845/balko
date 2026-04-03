import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, forwardRef, startTransition } from "react";

export type SelectOption = {
  value: string;
  label: string;
  dialCode?: string;
  short?: string;
  disabled?: boolean;
  state?: string;
};

type SelectFormItemProps = {
  flags?: boolean;
  dialCode?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  invalid?: boolean;
  errorMessage?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const SelectFormItem = forwardRef<HTMLButtonElement, SelectFormItemProps>(
  (
    {
      dialCode = false,
      flags = false,
      label,
      placeholder,
      invalid,
      errorMessage,
      className,
      options,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
      if (invalid) {
        startTransition(() => {
          setShowError(true);
        });
      } else {
        startTransition(() => {
          setShowError(false);
        });
      }
    }, [invalid, errorMessage]);

    useEffect(() => {
      startTransition(() => {
        setShowError(false);
      });
    }, [value]);

    const handleValueChange = (val: string) => {
      setShowError(false);
      if (onChange) onChange(val);
    };

    const isInvalid = invalid && showError;

    return (
      <div className={cn("flex flex-col gap-2 w-full", className)}>
        {label && (
          <Label className="font-semibold capitalize">{label}</Label>
        )}
        <Select
          onValueChange={handleValueChange}
          disabled={props.disabled as boolean}
          value={value}
          {...props}
        >
          <SelectTrigger
            ref={ref}
            onBlur={onBlur}
            className={`w-full h-12 py-4.5  shadow-none  placeholder:text-gray-400 placeholder:font-semibold  placeholder:capitalize focus:border focus:border-primary/50 text-sm ${isInvalid ? "border-red-500" : ""
              }`}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option: SelectOption) => {
              const uniqueKey = `${option.value}-${option.short ?? option.label
                }`;
              const selectValue = dialCode
                ? `${option.dialCode}-${option.value}`
                : option.value;

              return (
                <SelectItem
                  key={uniqueKey}
                  value={selectValue}
                  disabled={option.disabled}
                >
                  {option.state && (
                    <span className={`w-2 h-2 rounded-full ${option.state}`} />
                  )}
                  {flags && (
                    <Avatar>
                      <AvatarImage
                        src={`/img/countries/${option.short}.png`}
                        alt={option.value}
                      />
                      <AvatarFallback>{option.short}</AvatarFallback>
                    </Avatar>
                  )}
                  {dialCode ? option.dialCode : option.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {isInvalid && errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  },
);

SelectFormItem.displayName = "SelectFormItem";

export default SelectFormItem;
