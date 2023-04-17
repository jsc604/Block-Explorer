import { useState } from "react";
import SearchBar from "./SearchBar";
import AddressInfo from "./AddressInfo";

const SearchPage = ({ type }) => {
  const [searchParam, setSearchParam] = useState("");

  return (
    <div>
      <SearchBar
        type={type}
        setSearchParam={setSearchParam}
      />
      {searchParam && type === 'address' && <AddressInfo address={searchParam} />}
    </div>
  );
};

export default SearchPage;
