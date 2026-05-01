import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  startTransition,
} from "react";
import { Label } from "@/components/ui/label";
import { X, ChevronDown, ChevronUp, Search } from "lucide-react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Option {
  value: string;
  label: React.ReactNode;
  searchText?: string;
  disabled?: boolean;
}

interface CustomeSelectProps {
  label?: string;
  className?: string;
  placeholder?: string;
  labelClass?: string;
  error?: FieldError | string;
  name: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  options: Option[];
  required?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  onSearch?: (searchTerm: string) => void;
  loading?: boolean;
}

const CustomeSelect = ({
  label,
  className,
  placeholder,
  labelClass,
  error,
  value = [],
  onChange,
  required = false,
  searchable = true,
  multiple = true,
  onSearch,
  options,
  loading = false,
}: CustomeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelCache, setLabelCache] = useState<Record<string, string>>({});
  const selectedIds = useMemo(() => {
    return Array.isArray(value) ? value : value ? [value] : [];
  }, [value]);

  // Update cache whenever options change
  useEffect(() => {
    const nextCache = { ...labelCache };
    let hasChange = false;
    options.forEach((opt) => {
      const label =
        typeof opt.label === "string" ? opt.label : opt.searchText || opt.value;
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
          label:
            typeof opt.label === "string" ? opt.label : opt.searchText || id,
        };
      return { value: id, label: labelCache[id] || id };
    });
  }, [selectedIds, options, labelCache]);

  const sortedAndFilteredOptions = useMemo(() => {
    // 1. Filter by search term
    const filtered = options.filter((opt: Option) =>
      opt.searchText || (typeof opt.label === "string" ? opt.label : "").includes(searchTerm.toLowerCase())
    );

    // 2. Sort: Selected options always at the top
    return [...filtered].sort((a, b) => {
      const aSelected = selectedIds.includes(a.value);
      const bSelected = selectedIds.includes(b.value);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });
  }, [options, searchTerm, selectedIds]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionToggle = (optionValue: string) => {
    if (!onChange) return;

    if (multiple) {
      const exists = selectedIds.includes(optionValue);
      const newIds = exists
        ? selectedIds.filter((v) => v !== optionValue)
        : [...selectedIds, optionValue];
      onChange(newIds);
    } else {
      onChange(optionValue === value ? "" : optionValue);
      setIsOpen(false);
    }
  };

  const handleRemoveItem = (optionValue: string) => {
    if (!onChange) return;
    onChange(selectedIds.filter((v) => v !== optionValue));
  };

  const actualError = error;

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 grayscale-0",
        isOpen && "relative z-999",
      )}
    >
      {label && (
        <Label
          className={cn(
            "text-sm font-medium text-foreground/80 flex gap-1 items-center mb-0.5",
            labelClass,
          )}
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div
        ref={dropdownRef}
        className={cn("relative group/select", isOpen && "z-999")}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "min-h-10.5 w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background transition-all focus-within:ring  focus-within:ring-offset hover:bg-accent/10 flex items-center justify-between cursor-pointer text-left",
            actualError &&
            "border-destructive ring-destructive/20 focus-within:ring-destructive",
            className,
          )}
        >
          <div className="flex flex-wrap gap-1.5 flex-1 items-center min-w-0">
            {selectedObjects.length === 0 ? (
              <span className="text-muted-foreground italic truncate">
                {placeholder || "Select option..."}
              </span>
            ) : multiple ? (
              selectedObjects.map((opt) => (
                <div
                  key={opt.value}
                  className="bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1 border border-secondary shadow-sm"
                >
                  <span className="truncate max-w-30">{opt.label}</span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(opt.value);
                    }}
                    className="hover:bg-destructive/10 hover:text-destructive rounded-full p-0.5 transition-colors"
                  >
                    <X size={12} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2 truncate whitespace-normal">
                {selectedObjects[0].label}
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

        {isOpen && (
          <div className="absolute z-1000 w-full mt-1 text-popover-foreground border rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 bg-white dark:bg-gray-800 dark:text-white">
            <div className="p-1 space-y-1">
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
                  {searchable && (
                    <div className="relative flex items-center p-2 mb-1">
                      <Search
                        size={14}
                        className="absolute left-4 text-muted-foreground"
                      />
                      <input
                        type="text"
                        value={searchTerm}
                        autoFocus
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          onSearch?.(e.target.value);
                        }}
                        placeholder="Search options..."
                        className="w-full h-8 pl-8 pr-3 text-sm bg-accent/50 rounded-md border-transparent outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                  )}
                  <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                    {sortedAndFilteredOptions.length > 0 ? (
                      sortedAndFilteredOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          disabled={option.disabled}
                          onClick={() => handleOptionToggle(option.value)}
                          className={cn(
                            "w-full px-2 py-1.5 text-sm text-left flex items-center gap-3 rounded-md transition-colors",
                            option.disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-accent hover:text-accent-foreground cursor-pointer font-normal",
                            selectedIds.includes(option.value)
                              ? "bg-primary/5 text-primary font-medium"
                              : "",
                          )}
                        >
                          <div className="flex-1 min-w-0">{option.label}</div>
                          {selectedIds.includes(option.value) && (
                            <div className="size-4 bg-primary rounded-full flex items-center justify-center shrink-0">
                              <span className="text-[10px] text-primary-foreground leading-none font-bold">
                                ✓
                              </span>
                            </div>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-muted-foreground text-center text-xs">
                        No matching results
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

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

export default CustomeSelect;
