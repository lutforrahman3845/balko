import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, LucideIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterOption } from "./FilterDropDown";

interface FilterSortProps {
  label: string;
  options: FilterOption[];
  selectedValues: string;
  onSelectedValuesChange: (value: string) => void;
  icon?: LucideIcon;
  className?: string;
  setPageIndex: (pageIndex: number) => void;
}

const FilterSort = ({
  label,
  options,
  selectedValues,
  onSelectedValuesChange,
  icon: Icon = ArrowUpDown,
  className,
  setPageIndex,
}: FilterSortProps) => {
  const handleSelect = (id: string) => {
    onSelectedValuesChange(id);
    setPageIndex(1);
  };

  const selectedOption = options.find((opt) => opt.id === selectedValues);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="h-9 px-3 gap-2">
            <Icon className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium">
              {selectedOption ? selectedOption.name : label}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues === option.id;
                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => handleSelect(option.id)}
                      className="flex items-center justify-between gap-2 cursor-pointer py-2"
                    >
                      <span className="text-xs font-medium">{option.name}</span>
                      {isSelected && <Check className="size-3.5 text-primary" />}
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

export default FilterSort;
