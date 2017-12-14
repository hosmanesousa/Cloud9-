const request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body){
    // if no error AND status of the response is 200, then
  /* if ( ! error && response.statusCode == 200) {
       console.log(body);
   }*/
   
   if ( error) {
       console.log('Something went wrong');
       console.log(error);  // error info that occured during the request, e.g. wifi breakdown
   } else {
       if ( response.statusCode == 200){
           const parsedData = JSON.parse(body); // transform a string into an object
           console.log(parsedData.query.results.channel.astronomy.sunset); // the html text we requested
       }
   }
});