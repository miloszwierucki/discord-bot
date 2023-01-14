import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();
import { ICoinInfo } from "./request.js";
import { dataLog, currencySymbol } from "./index.js";

// Log in to Discord with the client's token
export const botLogin = async () => {
  const clientArray = [] as Client<boolean>[];
  dataLog.forEach(async (item) => {
    item.botID = process.env[`${item.botID}`] as string;
    item.token = process.env[`${item.token}`] as string;

    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    });
    clientArray.push(client);
    // client.once("ready", async () => {
    //   console.log(`Logged in as ${client.user?.tag}!`);
    // });
    client.login(item.token);
  });
  return clientArray;
};

// Update the bot's status and nickname
export const updatePrice = async (
  client: Client<boolean>,
  index: number,
  coinInfo: ICoinInfo[]
) => {
  const Guilds = client.guilds.cache.map((guild) => guild.id);

  client.user?.setPresence({
    activities: [
      {
        name: `${coinInfo[index].priceChangePct.toFixed(2)}% | ${coinInfo[
          index
        ].symbol.toUpperCase()}`,
        type: ActivityType.Watching,
      },
    ],
    status:
      coinInfo[index].rsi > 75
        ? "dnd"
        : coinInfo[index].rsi > 25
        ? "idle"
        : "online",
  });

  Guilds.forEach((server) => {
    const guild = client.guilds.resolve(server);
    const price = coinInfo[index].currentPrice;

    guild?.members.cache.map((member) =>
      member.setNickname(
        price > 1
          ? `${price}${currencySymbol}`
          : `${price.toLocaleString().replace(/,/g, ",")}${currencySymbol}`
      )
    );
  });
};
