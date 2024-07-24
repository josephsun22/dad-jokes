const SearchBar = ({ searchTerm, setSearchTerm, handleSubmit }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-[30vh] bg-gray-100">
      <div className="w-1/2 max-auto mb-10">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="search"
            className="mb-10 block text-center font-light text-6xl text-gray-700"
          >
            Search for Dad Jokes
          </label>
          <div className="relative shadow-md rounded-lg">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              id="search"
              type="search"
              value={searchTerm}
              onChange={handleInputChange}
              className="block px-10 w-full p-4 ps-10 text border border-gray-300 rounded-lg focus:outline-blue-600"
            />
            <button
              type="submit"
              className="text-white absolute end-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 text-lg  focus:outline-none font-light rounded-lg px-12 py-[9px]"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
