import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddressLink = ({ alchemy, address }) => {
  const [isContract, setIsContract] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContractStatus() {
      const bytecode = await alchemy.core.getCode(address, "latest");
      setIsContract(bytecode && bytecode !== "0x");
      setLoading(false);
    }

    fetchContractStatus();
  }, [alchemy, address]);

  if (loading) {
    return <span>Querying Data...</span>;
  }

  return (
    <Link
      to={isContract ? `/contract/${address}` : `/address/${address}`}
      className="text-blue-600 hover:underline"
    >
      {address}
    </Link>
  );
};

export default AddressLink;
