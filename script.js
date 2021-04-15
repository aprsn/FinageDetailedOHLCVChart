"use strict";

window.onload = function () {
  var _ref;

  var urlParams = new URLSearchParams(window.location.search);
  var symbol = urlParams.get('symbol');

  if (symbol != null) {
    symbol = symbol.toUpperCase();
  } else {
    symbol = "AAPL";
  }

  var dataPoints1 = [],
      dataPoints2 = [];
  var stockChart = new CanvasJS.StockChart("chartContainer", {
    theme: "light2",
    title: {
      text: symbol + " Price & Volume"
    },
    charts: [(_ref = {
      axisX: {
        lineThickness: 5,
        tickLength: 0,
        labelFormatter: function labelFormatter(e) {
          return "";
        }
      },
      axisY: {
        prefix: "$"
      }
    }, _ref["axisX"] = {
      enabled: false
    }, _ref.legend = {
      verticalAlign: "top"
    }, _ref.data = [{
      showInLegend: true,
      name: symbol + " Price (in USD)",
      yValueFormatString: "$#,###.##",
      type: "candlestick",
      dataPoints: dataPoints1,
      color: "#000",
      risingColor: "#088A4B",
      fallingColor: "#DF013A"
    }], _ref), {
      height: 100,
      axisY: {
        prefix: "$",
        labelFormatter: addSymbols
      },
      legend: {
        verticalAlign: "top"
      },
      data: [{
        showInLegend: true,
        name: "Volume (" + symbol + ")",
        yValueFormatString: "$#,###.##",
        dataPoints: dataPoints2
      }]
    }],
    navigator: {
      enabled: false
    },
    rangeSelector: {
      enabled: false
    }
  });


  
  const today = new Date().toISOString().substr(0, 19).split('T')[0];
  const to = new Date(new Date(today).setDate(new Date().getDate() + 7)).toISOString().substr(0, 19).split('T')[0];

  $.getJSON("https://api.finage.co.uk/agg/stock/" + symbol + "/5/minute/"+ today +"/"+ to +"?limit=50000&apikey=YOUR_API_KEY", function (data) {

    const rangeInfo = {
      volume: 0,
      high: 0,
      low: 0
    };

    rangeInfo.low = data.results[0].l;
    for (var i = 0; i < data.results.length; i++) {
      rangeInfo.volume = rangeInfo.volume + Number(data.results[i].v);
      
      if (rangeInfo.high < Number(data.results[i].h)) {
        rangeInfo.high = Number(data.results[i].h);
      }

      if (rangeInfo.low > Number(data.results[i].l)) {
        rangeInfo.low = Number(data.results[i].l);
      }

      dataPoints1.push({
        label: unixTime(data.results[i].t),
        y: [Number(data.results[i].o), Number(data.results[i].h), Number(data.results[i].l), Number(data.results[i].c)]
      });
      dataPoints2.push({
        label: unixTime(data.results[i].t),
        y: Number(data.results[i].v)
      });
    }
    
    document.querySelector("#i-volume").innerHTML = rangeInfo.volume;
    document.querySelector("#i-high").innerHTML = rangeInfo.high;
    document.querySelector("#i-low").innerHTML = rangeInfo.low;
    document.querySelector("#i-from").innerHTML = today;
    document.querySelector("#i-to").innerHTML = to;

    stockChart.render();
  });

  function addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1) order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  function unixTime(unixtime) {
    var dateobj = new Date(unixtime);
    var year = dateobj.getFullYear();
    var month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
    var date = ("0" + dateobj.getDate()).slice(-2);
    var hours = ("0" + dateobj.getHours()).slice(-2);
    var minutes = ("0" + dateobj.getMinutes()).slice(-2);
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
  }
};