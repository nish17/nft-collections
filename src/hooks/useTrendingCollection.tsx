import { useEffect, useState } from "react";
import { GraphQLClient } from "graphql-request";
import { ITrendingCollection, ITrendingCollectionDto, ITrendingCollectionHook } from "../types";

function getClient() {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT as string;

  const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });
  return graphQLClient;
}

async function fetchData(query: string): Promise<ITrendingCollection[] | undefined> {
  const client = getClient();
  try {
    const collections:ITrendingCollectionDto = await client.request(query);
    const transformedData = collections.trendingCollections.edges.map((collection) => collection.node);
    return transformedData;
  } catch(err) {
    console.log("Something went wrong while fetching the data: ", err);
  }
}

export function useTrendingCollection(query: string):ITrendingCollectionHook {

  const [collections, setCollections] = useState<ITrendingCollection[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchData(query);
        setIsLoading(false);
        setCollections(data);
      } catch(err) {
        setIsLoading(false);
        setErrors(err as string);
      }
    })();
  }, [query]);

 return { collections, isLoading, errors };
}