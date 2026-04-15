import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useMemo, startTransition } from "react";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Option {
  value: string;
  label: string;
  dialCode: string;
  short: string;
}

interface CountrySelectProps {
  label?: string;
  className?: string;
  placeholder?: string;
  error?: FieldError | string;
  name: string;
  value?: string | string[];
  options: Option[];
  required?: boolean;
  onChange?: (value: string | string[]) => void;
  loading?: boolean;
  flags?: boolean;
  dialCode?: boolean;
}

const CountrySelect = ({
  label,
  className,
  placeholder,
  error,
  value = [],
  required = false,
  onChange,
  options,
  loading = false,
  flags = false,
  dialCode = false,
}: CountrySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [labelCache, setLabelCache] = useState<Record<string, string>>({});
  const selectedIds = useMemo(() => {
    return Array.isArray(value) ? value : value ? [value] : [];
  }, [value]);

  useEffect(() => {
    const nextCache = { ...labelCache };
    let hasChange = false;
    options.forEach((opt) => {
      const label =
        typeof opt.label === "string" ? opt.label : opt.label || opt.value;
      if (nextCache[opt.value] !== label) {
        nextCache[opt.value] = label;
        hasChange = true;
      }
    });
    if (hasChange) {
      startTransition(() => {
        setLabelCache(nextCache);
      });
    }
  }, [options, labelCache]);

  // Derived selected objects for display
  const selectedObjects = useMemo(() => {
    return selectedIds.map((id) => {
      const opt = options.find((o) => o.value === id);
      if (opt)
        return {
          value: id,
          label: opt.label || id,
          short: opt.short,
          dialCode: opt.dialCode,
        };
      return {
        value: id,
        label: labelCache[id] || id,
        short: "",
        dialCode: "",
      };
    });
  }, [selectedIds, options, labelCache]);

  const filteredOptions = options.filter((opt) => {
    const searchStr =
      opt.label || (typeof opt.label === "string" ? opt.label : "");
    return searchStr.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOptionToggle = (optionValue: string) => {
    if (!onChange) return;
    onChange(optionValue === value ? "" : optionValue);
    setIsOpen(false);
  };

  const actualError = error;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 grayscale-0 ",
        isOpen && "relative z-50",
      )}
    >
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "min-h-9 w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background transition-all focus-within:ring focus-within:ring-offset hover:bg-accent/10 flex items-center justify-between cursor-pointer text-left",
              actualError &&
                "border-destructive ring-destructive/20 focus-within:ring-destructive",
              className,
            )}
          >
            <div className="flex flex-wrap gap-2 flex-1 items-center min-w-0">
              {selectedObjects.length === 0 ? (
                <span className="text-muted-foreground italic truncate">
                  {placeholder || "Select country..."}
                </span>
              ) : (
                <div className="flex items-center gap-2 truncate whitespace-normal">
                  {flags && selectedObjects[0].short && (
                    <Avatar className="size-5 shrink-0">
                      <AvatarImage
                        src={`/countries/${selectedObjects[0].short}.png`}
                        alt={selectedObjects[0].value}
                      />
                      <AvatarFallback className="text-[8px]">
                        {selectedObjects[0].short}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {dialCode
                    ? selectedObjects[0].dialCode
                    : selectedObjects[0].label}
                </div>
              )}
            </div>
            <div className="flex items-center transition-transform duration-200">
              {isOpen ? (
                <ChevronUp size={16} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={16} className="text-muted-foreground" />
              )}
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width) max-h-80 flex flex-col p-1"
          align="start"
        >
          {loading ? (
            <div className="p-1 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-2 py-1.5 opacity-60"
                >
                  <Skeleton className="size-8 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="relative flex items-center  mb-1 border-b">
                <Search
                  size={14}
                  className="absolute left-4 text-muted-foreground"
                />
                <input
                  type="text"
                  value={searchTerm}
                  autoFocus
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder="Search countries..."
                  className="w-full h-8 pl-8 pr-3 text-sm bg-accent/50 rounded-md border-transparent outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div className="overflow-y-auto custom-scrollbar flex-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleOptionToggle(option.value)}
                      className={cn(
                        "flex items-center justify-between cursor-pointer",
                        selectedIds.includes(option.value) &&
                          "bg-primary/5 text-primary font-medium",
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {flags && option.short && (
                          <Avatar className="size-6 shrink-0">
                            <AvatarImage
                              src={`/countries/${option.short}.png`}
                              alt={option.value}
                            />
                            <AvatarFallback className="text-[10px]">
                              {option.short}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <span className="truncate">
                          {dialCode ? option.dialCode : option.label}
                        </span>
                      </div>
                      {selectedIds.includes(option.value) && (
                        <div className="size-4 bg-primary rounded-full flex items-center justify-center shrink-0 ml-2">
                          <span className="text-[10px] text-primary-foreground leading-none font-bold">
                            ✓
                          </span>
                        </div>
                      )}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="px-4 py-8 text-muted-foreground text-center text-xs italic">
                    No matching results
                  </div>
                )}
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {actualError && (
        <span className="text-destructive text-xs font-medium ml-1 animate-in slide-in-from-top-1">
          {typeof actualError === "string"
            ? actualError
            : (actualError as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default CountrySelect;
