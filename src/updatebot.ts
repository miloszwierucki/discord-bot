import data from "./data.json" assert { type: "json" };
import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

import { IData } from "./request.js";
import { coinInfo } from "./request.js";
import { currencySymbol } from "./index.js";

interface IDataSecrets extends IData {
  botID: string | "undefined";
  token: string | "undefined";
}

export const dataLog = [...data] as IDataSecrets[];

dataLog.forEach((item) => {
  item.botID = process.env[`${item.botID}`] as string;
  item.token = process.env[`${item.token}`] as string;
});

// Log in to Discord with the client's token
export const makeBot: any = () => {
  dataLog.forEach((item, index) => {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    });

    client.once("ready", () => {
      console.log(`Logged in as ${client.user?.tag}!`);
      updatePrice(client, index);
    });

    client.login(item.token);
  });
};

const updatePrice = async (client: Client<boolean>, index: number) => {
  const Guilds = client.guilds.cache.map((guild) => guild.id);

  client.user?.setPresence({
    activities: [
      {
        name: `${coinInfo[index].currentPrice.toFixed(2)}% | ${coinInfo[
          index
        ].symbol.toUpperCase()}`,
        type: ActivityType.Watching,
      },
    ],
    status: "dnd",
  });

  Guilds.forEach(async (server) => {
    const guild = client.guilds.resolve(server);

    await guild?.members
      .fetch(dataLog[index].botID)
      .then(
        async (member) =>
          await member.setNickname(
            `${coinInfo[index].currentPrice
              .toLocaleString()
              .replace(/,/g, ",")}${currencySymbol}`
          )
      );
    //member.setNickname(`${currentPrice}${imp.currencySymbol}`);
  });
};
