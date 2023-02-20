import React from "react";
import { DigitalWalletsList } from "../../components/DigitalWalletsList/DigitalWalletsList";
import { MyContext } from "../../components/MyContext/MyContext";
import "./DigitalWalletsView.scss";

export const DigitalWallets = () => {
  return (
    <div className="digital-wallet-view">
      <h1>Wallets</h1>
      <MyContext.Consumer>
        {({ isDigitalWallet }) => (
          <DigitalWalletsList isDigitalWallet={isDigitalWallet} />
        )}
      </MyContext.Consumer>
    </div>
  );
};
