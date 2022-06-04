import React, {useState} from 'react';
import {useGetCryptoNewsQuery} from "../../services/cryptoNewsApi";
import {Avatar, Card, Col, Row, Select, Typography} from "antd";
import moment from "moment";
import {useGetCryptosQuery} from "../../services/cryptoApi";

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

function News({simplified}) {
    const { data: cryptosList } = useGetCryptosQuery(100);
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory: newsCategory, count: simplified ? 6 : 12})

    if (!cryptoNews?.value) return 'Loading...';

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch={true}
                        className={"select-news"}
                        placeholder={"Select a Crypto"}
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Select.Option value={"Cryptocurrency"}>Cryptocurrency</Select.Option>
                        {
                            cryptosList?.data?.coins.map(coin => (
                                <Select.Option value={coin.name}>{coin.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((cryptoNew, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable={true} className="news-card">
                        <a href={cryptoNew.url} target={"_blank"} rel="noreferrer">
                            <div className="news-image-container">
                                <Typography.Title className="news-title" level={4}>
                                    {cryptoNew.name}
                                </Typography.Title>
                                <img style={{maxWidth: '200px', maxHeight: '100px'}} alt={"news"} src={cryptoNew?.image?.thumbnail?.contentUrl || demoImage}/>
                            </div>
                            <p>
                                {cryptoNew.description > 100 ? `${cryptoNew.description.substring(0, 100)}...` : cryptoNew.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar alt={""} src={cryptoNew.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                    <Typography.Text className="provider-name">{cryptoNew.provider[0]?.name}</Typography.Text>
                                </div>
                                <Typography.Text>
                                    {moment(cryptoNew.datePublished).startOf('ss').fromNow()}
                                </Typography.Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default News;