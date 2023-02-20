import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { DigitalWalletAddForm } from "./components/DigitalWalletAddForm/DigitalWalletAddForm";
import ErrorBoundary from "./components/ErrorBoundaries/ErrorBoundaries";
import { MyContext } from "./components/MyContext/MyContext";
import { DigitalWallets } from "./view/DigitalWalletsView/DigitalWalletsView";

function App() {
  const [isDigitalWallet, setIsDigitalWallet] = useState([]);

  useEffect(() => {
    const request = indexedDB.open("DigitalWallet", 3);

    request.onsuccess = () => {
      const db = request.result;
      let fullDigitalWallets = db
        .transaction(["DigitalWalletData"], "readwrite")
        .objectStore("DigitalWalletData")
        .getAll();
      fullDigitalWallets.onsuccess = (e) => {
        let fullDigitalWalletsData = e.target.result;
        setIsDigitalWallet(fullDigitalWalletsData);
        console.log("oooo", fullDigitalWallets);
      };
    };
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ErrorBoundary>
          <MyContext.Provider value={{isDigitalWallet}}>
            <DigitalWallets
              // setIsDigitalWallet={setIsDigitalWallet}
              // isDigitalWallet={isDigitalWallet}
            />
          </MyContext.Provider>
          </ErrorBoundary>
        </Route>
        <Route exact path="/DigitalWalletAddForm">
          <ErrorBoundary>
          <DigitalWalletAddForm setDigitalWallet={setIsDigitalWallet} />
          </ErrorBoundary>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
