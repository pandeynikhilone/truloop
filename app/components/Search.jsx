function Search() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[90%] lg:w-full h-9 px-4 rounded-[60px] outline-1 outline-Grey-2 flex items-center gap-2">
        {/* Input field */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none text-sm"
        />

        {/* Search icon */}
        <img
          src="/homepage/search.svg"
          alt="search icon"
          className="w-5 h-5 hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
export default Search;