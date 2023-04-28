let question = "purple";
let requestUrl = "https://developer.nps.gov/api/v1/parks?limit=5&q=" + question +"&api_key=zcVsmk0xbipvcZpXfFUHrZuNkcfpYUIRiuic2fh1";
let example = [];
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
       //console.log(data)
      for (i = 0; i < data.data.length; i++) {
        example.push(data.data[i].fullName);
        localStorage.setItem("12345"[i], example[i]);

      }
      console.log(example[0]);

      //local storage stuff
     // localStorage.setItem(example[0], example[0]);
     //localStorage.getItem()



      //2nd call
      //not very pretty at all, will probably need a new API since wikipedia is not CORS compliant and the proxyURL is messy.
      //let requestUrl2 = "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search="+ example[0] + "&limit=5";
      let proxyURL = 'https://cors-anywhere.herokuapp.com/';
      let requestUrl2 = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + example[0] + "&explaintext=1&exsectionformat=wiki&redirects=1";

      fetch(proxyURL + requestUrl2)
      .then(response => response.json())
      .then(function (response2) {
        return response2;
      })
      .then(function (data2) {
        console.log(data2.query.pages[62671].extract);
      });

      //set items on page

      

  });
  
