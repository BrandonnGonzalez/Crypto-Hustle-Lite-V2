import { useState, useEffect } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/top/totaltoptiervol?limit=10&tsym=USD&api_key=${API_KEY}`
      );
      const data = await response.json();
      setList(data);
    };
    fetchAllCoinData().catch(console.error);
  }, []);

  console.log(list.Data);
  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <ul>
        {list?.Data.map((data) => data.CoinInfo)
          .filter(
            (coinData) =>
              coinData.Algorithm !== 'N/A' && coinData.ProofType !== 'N/A'
          )
          .map((coinData) => (
            <li key={coinData.FullName}>{coinData.FullName}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
