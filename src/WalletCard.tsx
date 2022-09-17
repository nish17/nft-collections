import { useState } from "react";
import { ethMethods, IChildState } from "./types";
function WalletCard({passChildState}:any) {

  const CONNECT_METAMASK = "Connect Metamask to explore!";
  const WALLET_CONNECTED = "Wallet Connected!";
  const LOG_OUT = "Click to logout!";
  
  const [defaultAccount, setDefaultAccount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [btnText, setBtnText] = useState<string>(CONNECT_METAMASK);

  const handleMouseIn = () => {
    if(defaultAccount) setBtnText(LOG_OUT);
  };

  const handleMouseOut = () => {
    if(defaultAccount) setBtnText(WALLET_CONNECTED);
  };
  const accountChangedHandler = (account: string) => {
    if(!account) {
      setError("No Account found");
      return;
    }
    setDefaultAccount(account);
    setBtnText(WALLET_CONNECTED);
    passChildState((prevState:IChildState) => ({...prevState, isAccountSet: true}));
  }

  const connectWalletHandler = async () => {
    if(!window.ethereum) {
      setError("Metamask not found!");
      return;
    }
    if(defaultAccount) { 
      setDefaultAccount(""); 
      setBtnText(CONNECT_METAMASK);
      passChildState((prevState:IChildState) => ({...prevState, isAccountSet: false}));
      return;
    }
    const accounts = await window.ethereum.request({method: ethMethods.REQUEST_ACCOUNTS});
    accountChangedHandler(accounts[0]);
  }

  return (
    <div>
      <button onClick={connectWalletHandler} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}> {btnText} </button>
      {defaultAccount && <h3>Address: {defaultAccount} </h3>}
      {error && <h3> {error} </h3>}
    </div>
  );
}

export default WalletCard;