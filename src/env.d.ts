declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "prod" | "dev" | "test";
    NODE_PATH: string;

    DISCORD_TOKEN: string;
    VICTIMS_LIST: string;
    SUBREDDIT_LIST: string;
    MESSAGE_LIST: string;
  }
}
