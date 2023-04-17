import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div className="shadow-md p-8 mb-10 flex justify-between items-center">
      <Link
        className="text-3xl font-bold"
        to="/"
      >
        <h1>Block Explorer</h1>
      </Link>
      <nav className="">
        <Link
          className='mx-auto border border-gray-900 px-3.5 py-2.5 rounded-md ml-4 hover:bg-gray-900 hover:text-white'
          to="/address-balance"
        >
          <button>Get Address Balance</button>
        </Link>
        <Link
          className='mx-auto border border-gray-900 px-3.5 py-2.5 rounded-md ml-4 hover:bg-gray-900 hover:text-white'
          to="/address-tx"
        >
          <button>Get Address Transactions</button>
        </Link>
        <Link
          className='mx-auto border border-gray-900 px-3.5 py-2.5 rounded-md ml-4 hover:bg-gray-900 hover:text-white'
          to="/transaction"
        >
          <button>Get Transaction Data</button>
        </Link>
        <Link
          className='mx-auto border border-gray-900 px-3.5 py-2.5 rounded-md ml-4 hover:bg-gray-900 hover:text-white'
          to="/block"
        >
          <button>Get Block Data</button>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
