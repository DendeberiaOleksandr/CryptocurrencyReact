import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '8d982efdddmsh080ff4a74ec72e4p18090ejsn442cf80970c5'
}

const createRequest = (url) => ({
    url, headers: cryptoNewsHeaders
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        getCryptoNews: build.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi