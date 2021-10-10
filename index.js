const PORT = 3000;
const URL = 'https://zeenews.india.com';

const { default: axios } = require('axios');
const { response } = require('express');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const getTopNews = (html) => {
    const topNews = [];
    const $ = cheerio.load(html);
    $('div .one-liner h3', html).each(function(){
        const text = $(this).text();
        const href = $(this).find('a').attr('href');
        topNews.push({
            text, href
        })
    });
    console.log({topNews});
};

axios.get(URL)
    .then(response => {
        const data = response.data;
        return getTopNews(data);
    })
    .catch(err => console.error(err))

app.listen(PORT, () => { console.log(`Server is running at PORT:${PORT}`)});
