import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { ITrendingCollection, ITrendingCollectionDto, ITrendingCollectionHook } from "../types";

const {REACT_APP_API_KEY, REACT_APP_API_ENDPOINT} = process.env;

function getClient() {
  const endpoint = REACT_APP_API_ENDPOINT as string;

  const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "x-api-key": REACT_APP_API_KEY as string,
      },
    });
  return graphQLClient;
}

async function fetchData(query: string, variables: Record<string, string>): Promise<ITrendingCollection[] | undefined> {
  const client = getClient();
  try {
    debugger;
    console.log('fetching');
    const collections:ITrendingCollectionDto = await client.request(query, variables);
    const transformedData = collections.trendingCollections.edges.map((collection) => collection.node);
    return transformedData;
  } catch(err) {
    console.log("Something went wrong while fetching the data: ", err);
  }
}

export function useTrendingCollection(query: string, variables: Record<string, string>, shouldFetch: boolean):ITrendingCollectionHook {

  const [collections, setCollections] = useState<ITrendingCollection[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);

    if(shouldFetch) {
      (async () => {
        setIsLoading(true);
        try {
          if(!collections) {
            const collections = await fetchData(query, variables);
            setIsLoading(false);
            setCollections(collections);
          }
        }catch(err) {
          setIsLoading(false);
          setErrors(err as string);
        }
      })();
    }
    // eslint-disable-next-line
  }, [query]);

 return { collections, isLoading, errors };
}