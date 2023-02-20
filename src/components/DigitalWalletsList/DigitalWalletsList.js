import { Card, Input, Popover } from "antd";
import React from "react";
import "./DigitalWalletsList.scss";
import { BsArrowUpShort,BsArrowDownShort } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { DigitalWalletForm } from "../DigitalWalletAdd/DigitalWalletAdd";
import CopyToClipboard from "react-copy-to-clipboard";

export const DigitalWalletsList = ({ isDigitalWallet}) => {
  console.log("www", isDigitalWallet);

  return (
    <div className="digital-wallets-list-container">
      {isDigitalWallet.map((each) => (
        <Card className="digital-wallet-list-item">
          <div className="digital-wallet-content-container">
            <div className="digital-wallet-logo-name-container">
              <img
                src={each.logo}
                alt="crypto"
                className="digital-wallet-crypto-currenncy-image"
              />
              <h1 className="digital-wallet-crypto-name">{each.crypto}</h1>
            </div>
            <div className="digital-wallet-crypto-value-container">
              <h1 className="digital-wallet-crypto-value">
                {each.cryptoRate} {each.currency}
              </h1>
              <p className={each.inPercentage>0?"digital-wallet-crypto-value-in-percentage1":'digital-wallet-crypto-value-in-percentage2'}>
                {
                  each.inPercentage>0?<BsArrowUpShort className="digital-wallet-increase-decrease-icons" />:<BsArrowDownShort className="digital-wallet-increase-decrease-icons" />
                }
                {each.inPercentage}%
              </p>
            </div>
          </div>
          <h1 className="digital-wallet-value-in-cryto">
            {each.inUSD} {each.cryptoCurrency}
          </h1>
          <Input
            value={each.copyBoard}
            addonAfter={
              <CopyToClipboard text={each.copyBoard}>
                <Popover trigger='click' content={<p>Copied!</p>}>
                <BiCopy className="digital-wallet-crypto-copy-icon" />
                </Popover>
              </CopyToClipboard>
            }
            className="digital-wallet-crypt-copyboard"
          />
        </Card>
      ))}

      <DigitalWalletForm
      />
    </div>
  );
};
