const OAuth = require('oauth');
const header = {
    "X-Yahoo-App-Id": process.env.YAHOO_APP_ID,
    "Content-Type": "application/json"
};
const request = new OAuth.OAuth(
    null,
    null,
    process.env.YAHOO_CONSUMER_KEY,
    process.env.YAHOO_CONSUMER_SECRET,
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);
const BASE_URL = "https://weather-ydn-yql.media.yahoo.com/"

async function fetchWeatherData(req, res) {
  const location = req.query.city || "mumbai,in"
  return new Promise((resolve, reject) => request.get(
    `${BASE_URL}forecastrss?location=${location}&format=json`,
    null,
    null,
    (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    }
  ));
}

module.exports = fetchWeatherData;