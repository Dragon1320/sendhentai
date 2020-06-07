import "reflect-metadata";

import fetch from "node-fetch";
import FormData from "form-data";

const validateDefined = (vars: unknown[]) => vars.reduce((a, c) => a && c != null, true);

const { DISCORD_TOKEN, VICTIMS_LIST, SUBREDDIT_LIST, MESSAGE_LIST } = process.env;

if (!validateDefined([DISCORD_TOKEN, VICTIMS_LIST, SUBREDDIT_LIST, MESSAGE_LIST])) {
  throw new Error("one or more env vars not defined");
}

(async () => {
  try {
    const victims = VICTIMS_LIST.split(";");
    const subreddit = SUBREDDIT_LIST.split(";")[Math.floor(Math.random() * SUBREDDIT_LIST.split(";").length)];
    const message = MESSAGE_LIST.split(";")[Math.floor(Math.random() * MESSAGE_LIST.split(";").length)];

    const hotPosts = await fetch(`https://www.reddit.com/r/${subreddit}/hot/.json`)
      .then((res) => res.json())
      .then((res) => res.data.children.filter((e: any) => e.data.stickied === false));

    const randomPost = hotPosts[Math.floor(Math.random() * hotPosts.length)];

    const file = await fetch(randomPost.data.url).then((res) => res.buffer());
    const ext = randomPost.data.url.split(".").slice(-1)[0];

    await Promise.all(
      victims.map((victim) => {
        const payload = new FormData();
        payload.append("file", file, `SPOILER_hentai.${ext}`);
        payload.append(
          "payload_json",
          JSON.stringify({
            content: message,
          }),
        );

        return fetch(`https://discordapp.com/api/v6/channels/${victim}/messages`, {
          method: "post",
          headers: {
            Authorization: DISCORD_TOKEN,
            ...payload.getHeaders(),
          },
          body: payload,
        });
      }),
    );

    console.log("success");
  } catch (error) {
    console.error(error);
  }
})();
