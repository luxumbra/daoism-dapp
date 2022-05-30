

export type Maybe<T> = T | null;

export type AppContextType = {
  user: Maybe<string>;
  userEns: Maybe<string>;
  chainId: Maybe<string>;
  connected: boolean;

}