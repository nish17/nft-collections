import { useState } from "react";
import styles from '../src/App.module.css';
import { CollectionsView } from "../src/components/Collections";
import { IChildState } from "../src/types";
import WalletCard from '../src/components/WalletCard';

function App() {
  const [childState, setChildState] = useState<IChildState>({isAccountSet: false});

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <WalletCard passChildState={setChildState}/>
        {childState.isAccountSet && <CollectionsView childState={childState}/>}
      </header>
    </div>
  );
}

export default App;
