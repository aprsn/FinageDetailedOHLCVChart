# FinageDetailedOHLCVChart
Draw a OHLCV chart by using the Finage's aggregate API

Finage is using its own APIs in the UI pages. 
https://finage.co.uk/stock/aapl

I wanted to show you how to use the Finage's [Aggregate API](https://finage.co.uk/docs/api/stock-market-aggregates-api) to draw a detailed OHLCV chart. In this example, I've used the <b>CanvasJS</b> library to draw a chart. Also, you can install the <b>JQuery</b> library to make an API request, it's optional.

<br>


The endpoint I've used in this example is,
> https://api.finage.co.uk/agg/stock/{symbol}/{multiply}/{time}/{from}/{to}?apikey=YOUR_API_KEY


We are getting the Ticker symbol from the URL and drawing the chart. If it's null, we will draw the AAPL's chart as default. 
<br>
#### Get your free key
If you do not have an API key, you can yours for free;
https://moon.finage.co.uk/register?subscribe=API00

<br>

In our UI page, we 've also used the Stock Details API to create a more user friendly page. You can also take a look at this useful endpoint;

https://finage.co.uk/docs/api/stock-market-details-api

<br><br>

Please contact us via E-Mail if you have any technical questions about the services;
dev@finage.co.uk