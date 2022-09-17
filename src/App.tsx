import { useState } from "react";
import './App.css';
import { IChildState } from "./types";
import WalletCard from './WalletCard';
function App() {
  const [childState, setChildState] = useState<IChildState>({isAccountSet: false});
  return (
    <div className="App">
      <header className="App-header">
        <h3>Hello world</h3>
        <WalletCard passChildState={setChildState}/>
        {childState.isAccountSet ? <div>Account Present</div>: <div>Account Absent</div>}
      </header>
    </div>
  );
}

export default App;
