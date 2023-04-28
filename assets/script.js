let question = "yellow stone";
var requestUrl = "https://developer.nps.gov/api/v1/parks?limit=5&q=" + question +"&api_key=zcVsmk0xbipvcZpXfFUHrZuNkcfpYUIRiuic2fh1";
var requestUrl2 = "https://api.openweathermap.org/geo/1.0/direct?q=london&appid=489926538e0b86d709e90c069e0d5027";
let example = [];
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //console.log(data)
    for (i = 0; i < data.data.length; i++) {
    example.push(data.data[i].fullName);
    }
    console.log(example[0]);
      
      
    fetch(requestUrl2)
    .then(function (response2) {
    return response2.json();
    })
    .then(function (data2) {
       console.log(data2)
     /* for (i = 0; i < data.data.length; i++) {
        example.push(data.data[i].fullName);
        console.log(example[0]);
      } */
  });
  });

