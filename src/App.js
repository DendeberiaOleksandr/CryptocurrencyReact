import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar";
import {Layout, Space, Typography} from "antd";
import Homepage from "./components/Homepage/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails/CryptoDetails";
import News from "./components/News/News";

function App() {
  return (
    <div className="app">
        <div className="navbar">
            <Navbar/>
        </div>
        <div className="main">
            <Layout>
                <div className="routes">
                    <Routes>
                        <Route exact element={<Homepage/>} path="/" />
                        <Route exact element={<Cryptocurrencies/>} path="/cryptocurrencies"/>
                        <Route exact element={<CryptoDetails/>} path="/crypto/:coinId"/>
                        <Route exact element={<News/>} path="/news"/>
                    </Routes>
                </div>
            </Layout>
            <div className="footer">
                <Typography.Title level={5} style={{color: "white", textAlign: "center"}}>
                    Cryptoverse<br/>
                    All rights reserved
                </Typography.Title>
                <Space>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/exchanges"}>Exchanges</Link>
                    <Link to={"/news"}>News</Link>
                </Space>
            </div>
        </div>
    </div>
  );
}

export default App;
