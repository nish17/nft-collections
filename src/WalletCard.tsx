import { useState } from "react";
import { ethMethods, BtnStrings, IChildState } from "./types";
function WalletCard({passChildState}:any) {
  
  const [defaultAccount, setDefaultAccount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [btnText, setBtnText] = useState<string>(BtnStrings.CONNECT_METAMASK);

  const handleMouseIn = () => {
    if(defaultAccount) {
      setBtnText(BtnStrings.LOG_OUT);
    }
  };

  const handleMouseOut = () => {
    if(defaultAccount) {
      setBtnText(BtnStrings.WALLET_CONNECTED);
    }
  };
  const accountChangedHandler = (account: string) => {
    if(!account) {
      setError("No Account found");
      return;
    }
    setDefaultAccount(account);
    setBtnText(BtnStrings.WALLET_CONNECTED);
    passChildState((prevState:IChildState) => ({...prevState, isAccountSet: true}));
  }

  const connectWalletHandler = async () => {
    if(!window.ethereum) {
      setError("Metamask not found!");
      return;
    }
    if(defaultAccount) { 
      setDefaultAccount(""); 
      setBtnText(BtnStrings.CONNECT_METAMASK);
      passChildState((prevState:IChildState) => ({...prevState, isAccountSet: false}));
      return;
    }
    const accounts = await window.ethereum.request({method: ethMethods.REQUEST_ACCOUNTS});
    accountChangedHandler(accounts[0]);
  }

  return (
    <div>
      <button onClick={connectWalletHandler} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}> {btnText} </button>
      {defaultAccount && <h3> Your Address: {defaultAccount} </h3>}
      {error && <h3> {error} </h3>}
    </div>
  );
}

export default WalletCard;