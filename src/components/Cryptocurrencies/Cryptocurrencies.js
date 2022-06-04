import React, {useEffect, useState} from 'react';
import {useGetCryptosQuery} from "../../services/cryptoApi";
import {Card, Col, Input, Row} from "antd";
import {Link} from "react-router-dom";
import millify from "millify";

function Cryptocurrencies({ simplified }) {

    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)

    }, [cryptosList, searchTerm])

    if (isFetching){
        return 'Loading...'
    }

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder={"Search Cryptocurrency"} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container" >
                {
                    cryptos?.map((crypto, index) => (
                        <Col key={crypto.uuid} xs={24} sm={12} lg={6} className="crypto-card">
                            <Link to={`/crypto/${crypto.uuid}`}>
                                <Card
                                    hoverable={true}
                                    extra={<img src={crypto.iconUrl} className="crypto-image"/>}
                                    title={`${crypto.rank}. ${crypto.name}`}
                                >
                                    <p>Price: {millify(crypto.price)}</p>
                                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                                    <p>Daily Change: {millify(crypto.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}

export default Cryptocurrencies;