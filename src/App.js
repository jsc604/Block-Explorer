import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import LatestBlocks from './components/LatesBlocks';
import NavBar from './components/NavBar';
import SearchPage from './components/SearchPage';
import AddressBalance from './components/AddressBalance';
import AddressTx from './components/AddressTx';
import Transaction from './components/Transaction';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <Router>
      <div className='text-gray-900'>
        <NavBar />
        <div className='w-4/5 mx-auto'>
          <Switch>
            <Route path="/" exact>
              <div className=''>
                <LatestBlocks blockNumber={blockNumber} home={true}/>
              </div>
            </Route>
            <Route path='/address-balance'>
              <Switch>
                <Route exact path='/address-balance' component={() => <SearchPage type='address-balance' />} />
                <Route path='/address-balance/:addressId' component={AddressBalance} />
              </Switch>
            </Route>
            <Route path='/address-tx'>
              <Switch>
                <Route exact path='/address-tx' component={() => <SearchPage type='address-tx' />} />
                <Route path='/address-tx/:txId' component={AddressTx} />
              </Switch>
            </Route>
            <Route path='/transaction'>
              <Switch>
                <Route exact path='/transaction' component={() => <SearchPage type='transaction' />} />
                <Route path='/transaction/:transactionId' component={Transaction} />
              </Switch>
            </Route>
            <Route path='/block'>
              <Switch>
                <Route exact path='/block' component={() => <SearchPage type='block' />} />
                <Route path='/block/:blockId' component={LatestBlocks} />
              </Switch>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
