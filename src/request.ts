import data from "./data.json" assert { type: "json" };
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

interface IData {
  coinID: string;
  size?: number;
}

interface IDataSecrets extends IData {
  botID: string | undefined;
  token: string | undefined;
}

interface ICoinInfo {
  currentPrice: number;
  priceChangePct: number;
  symbol: string;
}

const allCoins: Array<string> = [];
const dataLog = [...data] as IDataSecrets[];
dataLog.forEach((item) => {
  allCoins.push(item.coinID);
  item.botID = process.env[`${item.botID}`];
  item.token = process.env[`${item.token}`];
});

let coinInfo = [] as ICoinInfo[];
export const updateGecko = async (currency: string) => {
  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${allCoins.join(
        ","
      )}`
    )
    .then((res) => {
      res.data.forEach((item: any, index: number) => {
        coinInfo[index] = {
          currentPrice: item.current_price,
          priceChangePct: item.price_change_percentage_24h,
          symbol: item.symbol,
        };
      });
    });
  showStatus();
};

updateGecko("usd");

export const showStatus = () => {
  console.log(coinInfo);
};
