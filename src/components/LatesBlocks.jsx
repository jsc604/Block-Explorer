import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const LatestBlocks = ({ blockNumber, home }) => {
  const [block, setBlock] = useState();
  const { blockId } = useParams();
  const searchTerm = blockId || blockNumber;

  useEffect(() => {
    const blockNumberInHex = "0x" + parseInt(searchTerm).toString(16);
    async function getBlockWithTransactions() {
      setBlock(await alchemy.core.getBlockWithTransactions(blockNumberInHex));
    }

    getBlockWithTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const transaction =
    block &&
    block.transactions.map((transaction, i) => {
      return (
        <div className="p-4 border-b w-fit mx-auto" key={i}>
          <p className="break-words">
            TxHash:{" "}
            <Link
              to={`/transaction/${transaction.blockHash}`}
              className="text-blue-800 hover:underline"
            >
              {transaction.blockHash}
            </Link>
          </p>

          <p className="break-words">
            From:{" "}
            <Link
              to={`/address-balance/${transaction.from}`}
              className="text-blue-800 hover:underline"
            >
              {transaction.from}
            </Link>
          </p>

          <p className="break-words">
            To:{" "}
            <Link
              to={`/address-balance/${transaction.to}`}
              className="text-blue-800 hover:underline"
            >
              {transaction.to}
            </Link>
          </p>
        </div>
      );
    });
  return (
    <div>
      {home ? (
        <h2 className="text-center mb-4">
          Ethereum Latest Block: {searchTerm}
        </h2>
      ) : (
        <h2 className="text-center mb-4">Ethereum Block: {searchTerm}</h2>
      )}
      {transaction}
    </div>
  );
};

export default LatestBlocks;
