import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Transaction = ({ txHash }) => {
  const [data, setData] = useState();
  const [receipt, setReceipt] = useState();
  const { transactionId } = useParams();
  const searchTerm = txHash || transactionId;
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const fetchData = async () => {
    setLoading(true);
    let response = await alchemy.core.getTransactionReceipt(searchTerm);
    if (response === null) {
      alert("Transaction has not been mined yet");
      history.push("/transaction");
    }
    setReceipt(response);

    if (response) {
      const transferData = await alchemy.core.getAssetTransfers({
        fromBlock: response.blockNumber,
        fromAddress: response.from,
        toAddress: response.to,
        excludeZeroValue: true,
        category: ["erc721", "erc1155", "internal", "external", "erc20"],
      });

      setData(transferData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  if (!data || loading) {
    return <p className="text-center py-30">Querying Data...</p>;
  }

  const tx = data && data.transfers.length > 0 ? data.transfers[0] : null;
  return (
    <div>
      {tx && (
        <>
          <h2 className="text-center font-semibold underline">
            Transfer data for tx: {searchTerm}
          </h2>
          <div className="mt-4">
            <Link to={`/address-balance/${tx.from}`}>
              <p className="mt-4">
                From:{" "}
                <span className="text-blue-800 hover:underline">{tx.from}</span>
              </p>
            </Link>
            <Link to={`/address-balance/${tx.to}`}>
              <p className="mt-4">
                To:{" "}
                <span className="text-blue-800 hover:underline">{tx.to}</span>
              </p>
            </Link>
            <p className="mt-4">
              Value: {tx.value} {tx.asset}
            </p>
            <p className="mt-4">
              Gas used:{" "}
              {Utils.formatEther(parseInt(receipt.cumulativeGasUsed._hex))} ETH
            </p>
            <p className="mt-4">Confirmations: {receipt.confirmations}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Transaction;
