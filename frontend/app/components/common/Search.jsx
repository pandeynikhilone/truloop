"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Search({ value, onChange }) {
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState("");

  const isControlled = value !== undefined && onChange !== undefined;

  const handleChange = (e) => {
    if (isControlled) {
      onChange(e.target.value);
    } else {
      setLocalQuery(e.target.value);
    }
  };

  const executeSearch = () => {
    if (!isControlled && localQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(localQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeSearch();
    }
  };

  return (
    <div className="flex justify-center h-7 w-full">
      <div className="lg:w-full px-4 rounded-[60px] outline-2 outline-Grey-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={isControlled ? value : localQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <img
          src="/homepage/search.svg"
          alt="search icon"
          className="w-5 h-5 hover:cursor-pointer"
          onClick={executeSearch}
        />
      </div>
    </div>
  );
}
export default Search;