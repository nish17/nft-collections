import { useTrendingCollection } from "./hooks/useTrendingCollection";
import { TRENDING_COLLECTION } from "./queries";
import './Collections.css';
import { ITrendingCollection, IChildState } from "./types";

export function CollectionsView({childState}: {childState: IChildState}) {
  const { collections, isLoading, errors } = useTrendingCollection(TRENDING_COLLECTION, {}, childState.isAccountSet);

  if(isLoading) return <div>Loading...</div>;

  if(errors) return <div>Something went wrong</div>;

  return (
    <div>
      <h4>List of all Trending Collections</h4>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Volume</th>
          </tr>
        {collections && collections.length > 0 && collections.map((collection: ITrendingCollection) => (
          <tr key={collection.address}>
            <td>{collection.name}</td>
            <td>{collection.symbol ? collection.symbol: "-" }</td>
            <td>{collection.stats.volume}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}