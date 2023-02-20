import "./DigitalWalletAddForm.scss";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  message,
  Upload,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
} from "antd";
import { v4 as uuid } from "uuid";
import { CurrencyTypesOptions } from "../../constants/CurrencyTypesOptions";
import { CryptoCoinTypes } from "../../constants/CryptoCoinsTypesData";

export const DigitalWalletAddForm = ({
  setIsDigitalWallet,
}) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
    // return false;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      // setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const AddNewDigitalWallet = (values) => {
    // console.log("values", values);
    // console.log("un", values.inUSD.addonAfter);
    // let totalCardData = [];
    // let CardsData = localStorage.getItem("cardsDataInLocalStorage");
    // let CardsDataFromLocalStorage = JSON.parse(CardsData);
    // if (CardsDataFromLocalStorage === null) {
    //   totalCardData = [];
    // } else {
    //   totalCardData = CardsDataFromLocalStorage;
    // }
    // //  values['id'] = id;
    // values.logo = imageUrl;
    // // console.log(imageUrl);
    // const cardsData = {
    //   // id:values.uuid,
    //   logo: values.logo,
    //   crypto: values.crypto,
    //   inUSD: values.inUSD,
    //   inPercentage: values.inPercentage,
    //   cryptoRate: values.cryptoRate,
    //   currency: values.currency,
    //   cryptoCurrency: values.cryptoCurrency,
    //   uuid: uuid(),
    // };
    // totalCardData.push(cardsData);
    // // setIsDigitalWallet(totalCardData);
    // // setFinish(true);
    // console.log(totalCardData);
    // localStorage.setItem(
    //   "cardsDataInLocalStorage",
    //   JSON.stringify(totalCardData)
    // );

    const request = indexedDB.open("DigitalWallet", 3);

    //  create the Contacts object store and indexes

    function insertBoard(db, DigitalWalletData) {
      // create a new transaction
      const txn = db.transaction(["DigitalWalletData"], "readwrite"); // get the Contacts object store
      const store = txn.objectStore("DigitalWalletData");
      let query = store.add(DigitalWalletData);

      query.onsuccess = function (event) {
        console.log(event);
      };

      // handle the error case

      txn.oncomplete = function () {
        db.close();
      };
    }
    request.onupgradeneeded = () => {
      let db = request.result;

      console.log("db", db); // create the Contacts object store // with auto-increment id

      let store = db.createObjectStore("DigitalWalletData", {
        keyPath: "index",
        autoIncrement: true,
      }); // create an index on the email property

      let index = store.createIndex("Name", "Name", {
        keyPath: "name",
        unique: true,
      });
      console.log("index", index);
    };

    request.onsuccess = () => {
      const db = request.result;

      insertBoard(db, {
        id: uuid().slice(0, 3),
        logo: values.logo,
        crypto: values.crypto,
        inUSD: values.inUSD,
        inPercentage: values.inPercentage,
        cryptoRate: values.cryptoRate,
        currency: values.currency,
        cryptoCurrency: values.cryptoCurrency,
        copyBoard: uuid().slice(0, 15 ),
      });

      let getDigitalWalletData = db
        .transaction(["DigitalWalletData"], "readwrite")
        .objectStore("DigitalWalletData")
        .getAll();

      getDigitalWalletData.onsuccess = function (event) {
        const digitalWalletDataFromIDB = event.target.result;
        setIsDigitalWallet(digitalWalletDataFromIDB);
        console.log("ppp", digitalWalletDataFromIDB);
      };
    };
    window.location.href = "/";
  };


  return (
    <div className="add-digital-wallet-form-container">
      <h1>Add Wallet</h1>
      {/* <Form onFinish={(values) => {onAddDigitalWallet(values)}} key={uuid().slice(0,5)}>
        <div>
          <Form.Item name="crypto image">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </div>
        <div>
          <Form.Item name="name" label="Crypto Name">
            <Input />
          </Form.Item>
          <Form.Item name="cryptoValue" label="Crypto Value">
            <InputNumber onChange={onChange} defaultValue={0} />
          </Form.Item>
          <Form.Item name="cryptoType" label="crypto type">
            <Select
              defaultValue="USD"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={cryptoTypeOptions}
            />
          </Form.Item>
          <Form.Item name="cryptoPercentage" label="Crypto in %">
            <InputNumber onChange={percentageChange} defaultValue={0} />
          </Form.Item>
          <Form.Item name="cryptoCoins" label="Crypto coins">
            <InputNumber onChange={percentageChange} defaultValue={0} />
          </Form.Item>
          <Form.Item name="coinType" label="Coin Type">
            <Select
              defaultValue="BTC"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={coinTypeOptions}
            />
          </Form.Item>
        </div>
        <Button
          type="primary"
        >
          Save
        </Button>
      </Form> */}
      <Form
        key={uuid()}
        autoComplete="on"
        getValueFromEvent={normFile}
        onFinish={(values) => {
          AddNewDigitalWallet(values);
          console.log(values);
        }}
        className='add-digital-wallet-form'
      >
        <div className="add-digital-wallet-image-container">
          <Form.Item
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              rules={[{ required: true }]}
              name="avatar"
              listType="picture-card"
              // className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </div>
        <div className="add-digital-wallet-form-inputs-container">
          <Form.Item
            labelCol={{ span: 24 }}
            name="crypto"
            label="Name 0f Crypto"
            rules={[{ required: true }]}
          >
            <Input defaultValue="" type="text" />
          </Form.Item>
          <div className="crypto-currency-form-item-container-container">
            <Form.Item
              labelCol={{ span: 24 }}
              name="inUSD"
              label="Value in Currency"
              className="crypto-value-form-item"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber className="crypto-value-input" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              name="currency"
              label="Currency"
              className="crypto-currency-form-item"
              rules={[{ required: true }]}
            >
              <Select className="crypto-value-input">
                {CurrencyTypesOptions.map(each =>(
                  <Option value = {each}>{each}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            labelCol={{ span: 24 }}
            name="inPercentage"
            label="Profit in %"
            className="in-percentage-form-item"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber className="crypto-value-input" />
          </Form.Item>
          <div className="crypto-currency-form-item-container-container">
            <Form.Item
              labelCol={{ span: 24 }}
              name="cryptoRate"
              label="Crypto Coin Value"
              className="crypto-value-form-item"
              rules={[{ required: true }]}
            >
              <InputNumber
                defaultValue=""
                className="crypto-value-input"
                type="text"
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              name="cryptoCurrency"
              label="Crypto Coin"
              rules={[{ required: true }]}
              className="crypto-currency-form-item"
            >
              <Select className="crypto-value-input">
                {
                  CryptoCoinTypes.map(each => (
                    <Option value ={each}>{each}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </div>
          <div className="digital-wallet-save-button-container">
            <Form.Item>
              <Button type="primary" size="large"  htmlType="Save">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};
