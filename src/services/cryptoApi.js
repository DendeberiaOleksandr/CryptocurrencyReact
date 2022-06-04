import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'X-RapidAPI-Host': '',
    'X-RapidAPI-Key': ''
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
    url, headers: cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        getCryptos: build.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: build.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: build.query({
            query: ({coinId, timeperiod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi