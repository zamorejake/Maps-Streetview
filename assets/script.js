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
      let requestUrl2 = "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search="+ example[0] + "&limit=5";
      fetch(requestUrl2)
      .then(function (response2) {
        return response2.json();
      })
      .then(function (data2) {
        console.log(data2)
      });

      //set items on page

      

  });
  
