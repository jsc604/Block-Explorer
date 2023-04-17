import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import LatestBlocks from './components/LatesBlocks';
import NavBar from './components/NavBar';
import SearchPage from './components/SearchPage';
import AddressInfo from './components/AddressInfo';

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
                <LatestBlocks blockNumber={blockNumber} />
              </div>
            </Route>
            <Route path='/address'>
              <Switch>
                <Route exact path='/address' component={() => <SearchPage type='address' />} />
                <Route path='/address/:addressId' component={AddressInfo} />
              </Switch>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
