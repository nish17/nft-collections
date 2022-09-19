import { useState } from "react";
import styles from '../src/App.module.css';
import { CollectionsView } from "../src/components/Collections";
import WalletCard from '../src/components/WalletCard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <WalletCard setIsLoggedIn={setIsLoggedIn}/>
        {isLoggedIn && <CollectionsView/>}
      </header>
    </div>
  );
}

export default App;
