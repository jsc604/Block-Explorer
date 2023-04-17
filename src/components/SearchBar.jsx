import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = ({ type, setSearchParam }) => {
  const [searchTerm, setSearchTerm] = useState();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParam(searchTerm);
    
    if (type === "address") {
      history.push(`/address/${searchTerm}`);
    }
    // Add more conditions for other search types if needed
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <input
        className="w-3/5 border border-gray-900 rounded-md"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder={`Search ${type}...`}
      />
      <button
        type="submit"
        className="border border-gray-900 rounded-md ml-2 py-1 px-2 shadow-md hover:bg-gray-900 hover:text-white"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
