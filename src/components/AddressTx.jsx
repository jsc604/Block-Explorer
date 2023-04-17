import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const AddressTx = ({ addressTx }) => {
  const [data, setData] = useState();
  const [isContract, setIsContract] = useState();
  const [loading, setLoading] = useState(true);
  const { txId } = useParams();
  const searchTerm = addressTx || txId;

  useEffect(() => {
    async function fetchContractStatus() {
      const bytecode = await alchemy.core.getCode(searchTerm, "latest");
      setIsContract(bytecode && bytecode !== "0x");
      setLoading(false);
    }

    fetchContractStatus();
  }, [searchTerm]);

  useEffect(() => {
    const getAddressTxData = async () => {
      const transferParams = {
        excludeZeroValue: true,
        maxCount: 200,
        category: ["external", "internal", "erc20"],
        order: "desc",
      };

      if (isContract) {
        transferParams.toAddress = searchTerm;
      } else {
        transferParams.fromAddress = searchTerm;
      }

      let transferData = await alchemy.core.getAssetTransfers(transferParams);
      setData(transferData);
    };

    getAddressTxData();
  }, [isContract]);

  if (!data || loading) {
    return <p className="text-center py-30">Querying Data...</p>;
  }

  return (
    <div>
      <h2 className="font-semibold underline text-center py-4">
        Latest Transcations for {searchTerm}
      </h2>
      <table className="w-full">
        <tbody>
          <tr className="font-semibold border-b-2">
            <td>TxHash</td>
            <td>From</td>
            <td>Value</td>
            <td>To</td>
          </tr>
          {data.transfers.map((tx, i) => {
            return (
              <tr key={i}>
                <td>
                  <Link
                    to={`/transaction/${tx.hash}`}
                    className="text-blue-800 hover:underline"
                  >
                    {tx.hash.slice(0, 20)}...{tx.hash.slice(-6)}
                  </Link>
                </td>

                <td>
                  <Link
                    to={`/address-balance/${tx.from}`}
                    className="text-blue-800 hover:underline"
                  >
                    {tx.from.slice(0, 8)}...{tx.from.slice(-8)}
                  </Link>
                </td>

                <td>
                  {tx.value} {tx.asset}
                </td>

                <td>
                  <Link
                    to={`/address-balance/${tx.to}`}
                    className="text-blue-800 hover:underline"
                  >
                    {tx.to.slice(0, 8)}...{tx.to.slice(-8)}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddressTx;
