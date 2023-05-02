let example = [];
let submitButton = document.getElementById("submit");
let searchValue = document.getElementById("search");
let title = document.getElementById("title");
var states = {
    'Alabama': '01',
    

}

let nyurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=test&api-key=6p6VhtV9RUQZuaPRE6AOQWL2K9IwE9Ef'
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&fq=source:("The New York Times")&api-key=6p6VhtV9RUQZuaPRE6AOQWL2K9IwE9Ef

// fetch(nyurl)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       console.log(data);
// });
//api.census.gov/data/2021/acs/acs1/profile?get=group(DP02)&for=us:1&key=8f9405697f148ecb16a65fe8a55ec83e70100be9
var censusBaseURL = 'http://api.census.gov/data/2021/acs/acs1'
var censusData = '?get=NAME,B01001_001E'
var censusAPIKey = '&key=8f9405697f148ecb16a65fe8a55ec83e70100be9'
var userSearch = '&for=' + 'place' + ':*' + ':&in=state:*'
//replace connecticut
var x = 'https://api.census.gov/data/2021/pep/population?get=NAME,POP_2021&for=state:*'
fetch(censusBaseURL+censusData+userSearch+censusAPIKey)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
});

function  returnState () {
    // return state number in function
}
// submitButton.addEventListener("click", function (e) {
//   e.preventDefault();
//   let question = searchValue.value;
//   let requestUrl =
//         "https://developer.nps.gov/api/v1/parks?limit=5&q=" +
//         question +
//         "&api_key=zcVsmk0xbipvcZpXfFUHrZuNkcfpYUIRiuic2fh1";
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       for (i = 0; i < data.data.length; i++) {
//         example.push(data.data[i].fullName);
//         localStorage.setItem("12345"[i], example[i]);
//       }
//       //console.log(example[0]);

//       //local storage stuff
//       // localStorage.setItem(example[0], example[0]);
//       //localStorage.getItem()

//       //2nd call
//       let requestUrl2 =
//         "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
//         example[0] +
//         "&limit=5";

//       fetch(requestUrl2)
//         .then(function (response2) {
//           return response2;
//         })
//         .then(function (data2) {
//           console.log(data2.url);
//         });
//       searchValue.value = "";
//       let container = document.createElement("h4");
//       container.setAttribute("id", "page");
//       example.forEach(function (example) {
//         let container = document.createElement("h4");
//         container.textContent = example;
//         title.appendChild(container);
//       });
//       console.log(example.length);
//     });

//   //set items on page
// });

submitButton.addEventListener('click', fetchRequest)

function fetchRequest (e) {
    
}
