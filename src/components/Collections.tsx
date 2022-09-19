import { useTrendingCollection } from "../hooks/useTrendingCollection";
import { TRENDING_COLLECTION } from "../queries";
import styles from '../Collections.module.css';
import { ITrendingCollection, IChildState } from "../types";

export function CollectionsView({childState}: {childState: IChildState}) {
  const { collections, isLoading, errors } = useTrendingCollection(TRENDING_COLLECTION, {}, childState.isAccountSet);

  if(isLoading) return <div>Loading...</div>;

  if(errors) return <div>Something went wrong</div>;

  return (
    <div>
      <h4>List of all Trending Collections</h4>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Symbol</th>
            <th className={styles.th}>Volume</th>
          </tr>
        {collections && collections.length > 0 && collections.map((collection: ITrendingCollection) => (
          <tr key={collection.address}>
            <td className={styles.td}>{collection.name}</td>
            <td className={styles.td}>{collection.symbol ? collection.symbol: "-" }</td>
            <td className={styles.td}>{collection.stats.volume}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}