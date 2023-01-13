import axios from "axios";
import { dataLog } from "./updatebot.js";

export interface IData {
  coinID: string;
}

interface ICoinInfo {
  currentPrice: number;
  priceChangePct: number;
  symbol: string;
}

const allCoins: Array<string> = [];

dataLog.forEach((item) => {
  allCoins.push(item.coinID);
});

export let coinInfo = [] as ICoinInfo[];
export const updateGecko = async (currency: string) => {
  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${allCoins.join(
        ","
      )}`
    )
    .then((res) => {
      res.data.forEach((item: any) => {
        const index = allCoins.indexOf(item.id);
        coinInfo[index] = {
          currentPrice: item.current_price,
          priceChangePct: item.price_change_percentage_24h,
          symbol: item.symbol,
        };
      });
      //showStatus();
    })
    .catch((err) => console.log("Error at api.coingecko.com data:", err));
};

export const showStatus = async () => {
  await console.log(coinInfo);
};
