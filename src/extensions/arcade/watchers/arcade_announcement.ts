// keep an ear on #arcade-announcement channel & make sure only approved messages are posted

import { Slack, app } from "../../../lib/bolt.js";

const channelID = "C07AXU6FCC8"

const getOwnBotID = async () => {
  const bot = await Slack.auth.test();
  return bot.user_id || '';
}

const getUsersInChannel = async () => {
  return await Slack.conversations.members({channelID});
}
const ensureChannelJoined = async () => {
  const channel = await Slack.conversations.info(channelID);
  if (!channel?.ok) {
    throw new Error(`Failed to get channel info for ${channelID}`);
  }

  const [usersInChannel, ownBotID] = await Promise.all([getUsersInChannel(), getOwnBotID()]);
  if (!usersInChannel.includes(ownBotID)) {
    console.error(`⚠️ Bot is not in required channel ${channelID}`);
  }
}

// Run this once on startup to ensure the bot is correctly configured in the channel
setTimeout(ensureChannelJoined, 1000 * 5);

app.event('message', async ({ event }) => {  
  if (event.channel !== channelID) { return; }
  if (event.subtype === 'bot_message') { return; }
  if (!event.user) { return; }
  let user = event.user;

  if (!user?.id) {
    user = await Slack.users.info({user: event.user});
  }

  if (user.is_admin) { return }
  if (user.is_owner) { return }
  if (user.is_primary_owner) { return }
  // not an admin, delete the message
  await Slack.chat.delete({channel: event.channel, ts: event.ts});
  const thread_ts = event?.thread_ts || "";
  await Slack.chat.postEphemeral({
    channel: event.channel,
    user: user.id,
    thread_ts,
    text: "This is a read-only channel. Only admins can post here."
  });
});