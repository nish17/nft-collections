import { useState } from "react";
import './App.css';
import { CollectionsView } from "./Collections";
import { IChildState } from "./types";
import WalletCard from './WalletCard';

function App() {
  const [childState, setChildState] = useState<IChildState>({isAccountSet: false});

  return (
    <div className="App">
      <header className="App-header">
        <WalletCard passChildState={setChildState}/>
        {childState.isAccountSet && <CollectionsView childState={childState}/>}
      </header>
    </div>
  );
}

export default App;
