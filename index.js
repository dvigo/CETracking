const axios = require('axios');
const cheerio = require('cheerio');

const trackingId = "YOUR_TRACK_ID";
const cp = "SPANISH_CP";

const url = "https://s.correosexpress.com/search?s="+trackingId+"&cp="+cp

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('table.miyazaki > tbody > tr');
    statsTable.each(function() {
        let status = $(this).text().trim();
        console.log(status);
    })
})

async function fetchData(url) {
    console.log("Crawling data...");

    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error ocurred while fetching data");
        return;
    }

    return response;
}