export enum ethMethods {
  REQUEST_ACCOUNTS = "eth_requestAccounts",
}

export enum BtnStrings {
  CONNECT_METAMASK = "Connect Metamask to explore!",
  WALLET_CONNECTED = "Wallet Connected!",
  LOG_OUT = "Click to logout!",
};

export interface IChildState {
  isAccountSet: boolean;
}

export interface ITrendingCollection {
  address: string;
  name: string;
  stats: {
    volume: number;
  };
  symbol: string;
}

export interface ITrendingCollectionNode {
  node: ITrendingCollection;
}

export interface ITrendingCollectionDto {
  trendingCollections: {
    edges: ITrendingCollectionNode[];
  };
};

export interface ITrendingCollectionHook {
  collections: ITrendingCollection[] | undefined; 
  isLoading: boolean; 
  errors: string;
};