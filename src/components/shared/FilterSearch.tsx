import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FilterSearch = ({
  searchQuery,
  setSearchQuery,
  clssName,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clssName?: string;
}) => {
  return (
    <div className="relative">
      <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
      <Input
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        className={`ps-9 w-full  ${clssName || "max-w-sm"}`}
      />
      {searchQuery.length > 0 && (
        <Button
          variant="ghost"
          className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
          onClick={() => setSearchQuery("")}
        >
          <X />
        </Button>
      )}
    </div>
  );
};

export default FilterSearch;
