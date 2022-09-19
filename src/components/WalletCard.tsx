import { useState } from "react";
import { ethMethods, BtnStrings, IChildState } from "../types";
function WalletCard({ setIsLoggedIn }: any) {
  
  const [loggedInAccount, setLoggedInAccount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [btnText, setBtnText] = useState<string>(BtnStrings.CONNECT_METAMASK);

  const isLoggedIn = () => {
    return !!loggedInAccount;
  };

  const handleMouseIn = () => {
    if(isLoggedIn()) {
      setBtnText(BtnStrings.LOG_OUT);
    }
  };

  const handleMouseOut = () => {
    if(isLoggedIn()) {
      setBtnText(BtnStrings.WALLET_CONNECTED);
    }
  };

  const login = async () => {
    const accounts = await window.ethereum.request({method: ethMethods.REQUEST_ACCOUNTS});
    accountChangedHandler(accounts[0]);
  };

  const logout = () => {
    setLoggedInAccount(""); 
    setIsLoggedIn(false);
    setBtnText(BtnStrings.CONNECT_METAMASK);
  };

  const accountChangedHandler = (account: string) => {
    if(!account) {
      setError("No Account found");
      return;
    }
    setLoggedInAccount(account);
    setBtnText(BtnStrings.WALLET_CONNECTED);
    setIsLoggedIn(true);
  };

  const connectWalletHandler = async () => {
    if(!window.ethereum) {
      setError("Metamask not found!");
      return;
    }
    if(isLoggedIn()) { 
      logout();
      return;
    }
    await login();
  };

  return (
    <div>
      <button onClick={connectWalletHandler} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut}> {btnText} </button>
      {loggedInAccount && <h3> Your Address: {loggedInAccount} </h3>}
      {error && <h3> {error} </h3>}
    </div>
  );
}

export default WalletCard;