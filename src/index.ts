import data from "./data.json" assert { type: "json" };
import { botLogin, updatePrice } from "./updatebot.js";
import { updateGecko } from "./request.js";
interface IDataSecrets {
  coinID: string;
  botID: string | "undefined";
  token: string | "undefined";
}

export const dataLog = [...data] as IDataSecrets[];
export const currency = "usd"; // usd, eur, gbp
const delay = 1500;

export let currencySymbol = "";
if (currency === "usd") {
  currencySymbol = "$";
} else if (currency === "eur") {
  currencySymbol = "€";
} else if (currency === "gbp") {
  currencySymbol = "£";
}

async function start() {
  const clientArray = await botLogin();

  clientArray.forEach(async (client) => {
    client.once("ready", async () => {
      console.log(`Logged in as ${client.user?.tag}!`);
    });
  });

  setInterval(async () => {
    const coinInfo = await updateGecko(currency);
    clientArray.forEach(async (client, index) => {
      await updatePrice(client, index, coinInfo);
    });
  }, delay);

  // const coinInfo = await updateGecko(currency);
  // console.log(coinInfo);
}
start();
