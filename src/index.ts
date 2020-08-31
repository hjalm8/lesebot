import { CommandoClient } from "discord.js-commando";
import { config } from "dotenv";
import path from "path";

config();

const client = new CommandoClient({
  commandPrefix: process.env.DISCORD_PREFIX,
  owner: "217316187032256512",
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["fun", "Small, fun commands"],
    ["sound", "Cover your earholes"],
    ["uib", "Useful commands related to UiB"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
  if (!client.user) throw new Error("User not authenticated");
  console.log(`Logged in as ${client.user?.tag}! (${client.user?.id})`);
  void client.user?.setActivity("STUDENTS", { type: "WATCHING" });
});

client.on("error", console.error);

void client.login(process.env.DISCORD_TOKEN);
