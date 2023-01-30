import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./component/Coin";

function App() {
  const [listofCoins, SetListOfCoins] = useState([]);
  const [searchWord, SetSearchWord] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coinstats.app/public/v1/coins?skip=0&")
      .then((respone) => {
        SetListOfCoins(respone.data.coins);
        console.log(respone.data);
      });
  }, []);

  const CoinsFiltered = listofCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <div className="Header">
        <ul>
          <li>Bitcoin Price Tracker</li>
        </ul>
        <div>
          <input
            type="text"
            placeholder="Search For Bitcoins Here"
            onChange={(event) => {
              SetSearchWord(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="Display">
        {CoinsFiltered.map((coin) => (
          <div className="box">
            <Coin
              name={coin.name}
              price={coin.price}
              symbol={coin.symbol}
              icon={coin.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
