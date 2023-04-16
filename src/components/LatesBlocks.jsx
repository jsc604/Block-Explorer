import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const LatestBlocks = ({ blockNumber }) => {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockWithTransactions() {
      setBlock(await alchemy.core.getBlockWithTransactions(blockNumber));
    }

    getBlockWithTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("blocks- ", block);
  const transaction =
    block &&
    block.transactions.map((transaction, i) => {
      return (
        <div className="p-4 border-b w-fit mx-auto" key={i}>
          <p className="break-words">TxHash: {transaction.blockHash}</p>
          <p className="break-words">
            From: {transaction.from}
            <br />
            To: {transaction.to}
          </p>
        </div>
      );
    });
  return (
    <div>
      <h2 className="text-center mb-4">Ethereum Latest Block: {blockNumber}</h2>
      {transaction}
    </div>
  );
};

export default LatestBlocks;
