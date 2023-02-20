import { Card } from "antd";
import React  from "react";
import "./DigitalWalletAdd.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export const DigitalWalletForm = () => {
  

  return (
    <Link to = '/DigitalWalletAddForm'>
      <Card className="Digital-wallet-add-container">
        <div className="add-icon-container">
          <AiOutlinePlus />
        </div>
        <p className="add-text">Add Wallet</p>
      </Card>
    </Link>
  );
};
