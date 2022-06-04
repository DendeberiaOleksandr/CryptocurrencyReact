import React from 'react';
import {Col, Row, Typography} from "antd";
import {Statistic} from "antd";
import {useGetCryptosQuery} from "../../services/cryptoApi";
import millify from "millify";
import {Link} from "react-router-dom";
import Cryptocurrencies from "../Cryptocurrencies/Cryptocurrencies";
import News from "../News/News";

function Homepage(props) {

    const {data, isFetching} = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats;

    if (isFetching){
        return 'Loading'
    }

    return (
        <>
            <Typography.Title level={2} className="heading">
                Global Crypto Stats
            </Typography.Title>
            <Row>
                <Col span={12}><Statistic title={"Total Cryptocurrencies"} value={globalStats.total}/></Col>
                <Col span={12}><Statistic title={"Total Exchanges"} value={millify(globalStats.totalExchanges)}/></Col>
                <Col span={12}><Statistic title={"Total Market Cap"} value={millify(globalStats.totalMarketCap)}/></Col>
                <Col span={12}><Statistic title={"Total 24h Volume"} value={millify(globalStats.total24hVolume)}/></Col>
                <Col span={12}><Statistic title={"Total Markets"} value={millify(globalStats.totalMarkets)}/></Col>
            </Row>
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Top 10 Cryptocurrencies
                </Typography.Title>
                <Typography.Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">
                        Show more
                    </Link>
                </Typography.Title>
            </div>
            <Cryptocurrencies simplified={true} />
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Latest Crypto News
                </Typography.Title>
                <Typography.Title level={3} className="show-more">
                    <Link to="/news">
                        Show more
                    </Link>
                </Typography.Title>
            </div>
            <News simplified={true} />
        </>
    );
}

export default Homepage;