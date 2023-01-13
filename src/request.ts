import axios from "axios";
import { dataLog } from "./index.js";
import { calculateRSI } from "./rsi.js";

export interface ICoinInfo {
  currentPrice: number | 0;
  priceChangePct: number | 0;
  symbol: string | "";
  rsi: number | 0;
}

// Update the current price, price change and symbol of each coin
export const updateGecko = async (currency: string) => {
  const coinsInfo = [] as ICoinInfo[];
  const allCoins: Array<string> = [];

  dataLog.forEach((item) => {
    allCoins.push(item.coinID);
  });

  await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${allCoins.join(
        ","
      )}`
    )
    .then((res) => {
      res.data.forEach(async (item: any) => {
        const index = allCoins.indexOf(item.id);

        coinsInfo[index] = {
          currentPrice: item.current_price,
          priceChangePct: item.price_change_percentage_24h,
          symbol: item.symbol,
          rsi: 0,
        };
      });
    })
    .catch((err) => console.log("Error at api.coingecko.com data:", err));

  await Promise.all(
    dataLog.map(async (item, index) => {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${item.coinID}/ohlc?vs_currency=${currency}&days=7`
        )
        .then(async (res) => {
          const closePrices: Array<number> = [];
          res.data.forEach(async (itemData: any) => {
            closePrices.push(itemData[4]);
          });

          const rsi = await calculateRSI(closePrices);
          coinsInfo[index].rsi = rsi;
        })
        .catch((err) => console.log("Error at api.coingecko.com data:", err));
    })
  );

  return coinsInfo as ICoinInfo[];
};
