import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilterSearch = ({
  searchQuery,
  setSearchQuery,
  clssName,
  placeholder,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clssName?: string;
  placeholder?: string;
}) => {
  return (
    <div className={`relative w-full ${clssName || "max-w-sm"}`}>
      <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
      <Input
        placeholder={placeholder || "Search..."}
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        className="ps-9 w-full"
      />
      {searchQuery.length > 0 && (
        <Button
          variant="ghost"
          className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
          onClick={() => setSearchQuery("")}
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
};

export default FilterSearch;
