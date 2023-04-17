import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = ({ type, setSearchParam }) => {
  const [searchTerm, setSearchTerm] = useState();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchTerm || searchTerm.trim().length < 1) {
      alert("Enter a valid search term");
      return;
    }  

    setSearchParam(searchTerm);

    type === "address-balance" && history.push(`/address-balance/${searchTerm}`);
    type === "address-tx" && history.push(`/address-tx/${searchTerm}`);
    type === "transaction" && history.push(`/transaction/${searchTerm}`);
    type === "block" && history.push(`/block/${searchTerm}`);
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
