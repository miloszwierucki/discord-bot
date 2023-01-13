import { updateGecko } from "./request.js";
import { makeBot } from "./updatebot.js";

const currency = "usd"; // usd, eur, gbp
export let currencySymbol = "";

if (currency === "usd") {
  currencySymbol = "$";
} else if (currency === "eur") {
  currencySymbol = "€";
} else if (currency === "gbp") {
  currencySymbol = "£";
}

updateGecko(currency);
makeBot();
