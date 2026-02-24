import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  name: string;
  count?: number;
  color?: string;
}

interface FilterDropDownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectedValuesChange: (values: string[]) => void;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
}

const FilterDropDown = ({
  label,
  options,
  selectedValues,
  onSelectedValuesChange,
  icon: Icon = Filter,
  placeholder,
  className,
}: FilterDropDownProps) => {
  const handleToggle = (id: string) => {
    const newValues = selectedValues.includes(id)
      ? selectedValues.filter((v) => v !== id)
      : [...selectedValues, id];
    onSelectedValuesChange(newValues);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="h-9 px-3 gap-2">
            <Icon className="size-3.5" />
            {label}
            {selectedValues.length > 0 && (
              <>
                <div className="h-4 w-px bg-border mx-1" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  {selectedValues.length}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command>
            <CommandInput placeholder={placeholder || `Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.id);
                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => handleToggle(option.id)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        id={option.id}
                        checked={isSelected}
                        onCheckedChange={() => handleToggle(option.id)}
                      />
                      <Label
                        htmlFor={option.id}
                        className="flex grow items-center justify-between font-normal pointer-events-none"
                      >
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-xs font-medium",
                            option.color || "text-foreground"
                          )}>
                            {option.name}
                          </span>
                        </div>
                        {option.count !== undefined && (
                          <span className="text-muted-foreground text-xs font-medium">
                            {option.count}
                          </span>
                        )}
                      </Label>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterDropDown;
