import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Col, Row, Typography} from "antd";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const [data, setData] = useState()

    useEffect(() => {

        const coinPrice = []
        const coinTimestamp = []

        for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
            coinPrice.push(coinHistory?.data?.history[i].price);
        }

        for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
            coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
        }

        setData({
            labels: coinTimestamp,
            datasets: [
                {
                    label: 'Price In USD',
                    data: coinPrice,
                    fill: false,
                    backgroundColor: '#0071bd',
                    borderColor: '#0071bd',
                },
            ],
        })
    }, [coinHistory, currentPrice, coinName])

    return data && (
        <>
            <Row className="chart-header">
                <Typography.Title level={2} className="chart-title">{coinName} Price Chart </Typography.Title>
                <Col className="price-container">
                    <Typography.Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Typography.Title>
                    <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography.Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    );
};

export default LineChart;