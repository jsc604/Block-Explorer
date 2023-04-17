import { useState } from "react";
import SearchBar from "./SearchBar";
import AddressBalance from "./AddressBalance";
import AddressTx from "./AddressTx";
import Transaction from "./Transaction";
import LatestBlocks from "./LatesBlocks";

const SearchPage = ({ type }) => {
  const [searchParam, setSearchParam] = useState("");

  return (
    <div>
      <SearchBar
        type={type}
        setSearchParam={setSearchParam}
      />
      {searchParam && type === 'address-balance' && <AddressBalance address={searchParam} />}
      {searchParam && type === 'address-tx' && <AddressTx addressTx={searchParam} />}
      {searchParam && type === 'transaction' && <Transaction txHash={searchParam} />}
      {searchParam && type === 'block' && <LatestBlocks blockNumber={searchParam} />}
    </div>
  );
};

export default SearchPage;
