import { useState, useEffect } from 'react';
import './App.css';
import CoinInfo from "./components/CoinInfo"


const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  const searchItems = searchValue => {
    setSearchInput(searchValue)
    if (searchValue !== "") {
      const filteredData = list.Data.filter((item) => 
        Object.values(item.CoinInfo)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(list.Data)
    }
  }


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

  console.log(list?.Data);
  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
      type="text"
      placeholder="Search..."
      onChange={(inputString) => searchItems(inputString.target.value)} 
      />

      {searchInput.length > 0
        ? filteredResults
            .map((coin) => {
              const coinData = coin.CoinInfo;
              if (
                coinData.Algorithm !== "N/A" &&
                coinData.ProofType !== "N/A"
              ) {
                return (
                  <CoinInfo
                    key={coinData.Name}
                    image={coinData.ImageUrl}
                    name={coinData.FullName}
                    symbol={coinData.Name}
                  />
                );
              }
              return null;
            })
        : list?.Data
            .map((data) => data.CoinInfo)
            .filter(
              (coinData) =>
                coinData.Algorithm !== "N/A" &&
                coinData.ProofType !== "N/A"
            )
            .map((coinData) => (
              <CoinInfo
                key={coinData.Name}
                image={coinData.ImageUrl}
                name={coinData.FullName}
                symbol={coinData.Name}
              />
            ))}


      
      <ul>
        {list?.Data.map((data) => data.CoinInfo)
          .filter(
            (coinData) =>
              coinData.Algorithm !== 'N/A' && coinData.ProofType !== 'N/A'
          )
          .map((coinData) => (
            <CoinInfo
              key={coinData.Name}
              image={coinData.ImageUrl}
              name={coinData.FullName}
              symbol={coinData.Name}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
