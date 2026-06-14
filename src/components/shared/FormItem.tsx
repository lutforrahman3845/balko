import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { startTransition, useEffect, useState } from "react";
const FormItem = ({
  label,
  placeholder,
  inputType,
  invalid,
  errorMessage,
  suffixButton,
  textarea = false,
  onChange,
  required = false,
  ...props
}: {
  label?: React.ReactNode;
  placeholder?: string;
  inputType: string;
  invalid?: boolean;
  errorMessage?: string;
  textarea?: boolean;
  suffixButton?: React.ReactNode;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  [key: string]: unknown;
  required?: boolean;
}) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (inputType === "number") {
      let val = e.target.value;
      if (val.length > 1 && val.startsWith("0") && val[1] !== ".") {
        val = val.replace(/^0+/, "") || "0";
        e.target.value = val;
      }
      if (Number(val) < 0) {
        e.target.value = "0";
      }
    }
    if (showError) setShowError(false);
    if (onChange) onChange(e);
  };

  useEffect(() => {
    startTransition(() => {
      setShowError(false);
    });
  }, [props.value]);

  const isInvalid = invalid && showError;

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>}
      {textarea ? (
        <textarea
          placeholder={placeholder}
          className={`w-full  shadow-none placeholder:capitalize placeholder:italic placeholder:text-muted-foreground focus:outline-0 focus:border focus:border-primary/50 px-3 ${isInvalid ? "border-red-500" : ""
            } pt-3 pb-12 rounded-md border border-primary/30 text-sm`}
          onChange={handleChange}
          {...props}
        />
      ) : (
        <div className="relative">
          <Input
            type={inputType}
            placeholder={placeholder}
            className={`w-full   shadow-none placeholder:capitalize placeholder:italic placeholder:text-muted-foreground focus:outline-0 focus:border focus:border-primary/50 ${isInvalid ? "border-red-500" : ""
              } ${suffixButton && "pr-24"}`}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (inputType === "number" && e.key === "-") {
                e.preventDefault();
              }
            }}
            onClick={(e) => {
              if (
                inputType === "date" ||
                inputType === "time" ||
                inputType === "datetime-local"
              ) {
                try {
                  (e.target as HTMLInputElement).showPicker();
                } catch (err) {
                  console.error("showPicker not supported", err);
                }
              }
            }}
            min={inputType === "number" ? 0 : undefined}
            step={inputType === "number" ? "any" : undefined}
            {...props}
          />
          {suffixButton && (
            <div className="absolute inset-y-0 right-2.5 flex items-center">
              {suffixButton}
            </div>
          )}
        </div>
      )}
      {isInvalid && errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormItem;
