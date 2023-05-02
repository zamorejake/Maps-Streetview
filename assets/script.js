let example = [];
let submitButton = document.getElementById("submit");
let searchValue = document.getElementById("search");
let title = document.getElementById("title");
var states = {
    'Alabama': '01',

//data usa api to test
/*
var dataUSAURL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
fetch(dataUSAURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.data[0]);
});
*/
//button to trigger code
submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  let question = searchValue.value;
  let requestUrl =
    "https://developer.nps.gov/api/v1/parks?limit=1&q=" +
    question +
    "&api_key=zcVsmk0xbipvcZpXfFUHrZuNkcfpYUIRiuic2fh1";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      for (i = 0; i < data.data.length; i++) {
        example.push(data.data[i].fullName);
        localStorage.setItem("12345"[i], example[i]);
      }
      //local storage stuff

      //console.log(example[0]);
      //local storage stuff
      // localStorage.setItem(example[0], example[0]);
      //localStorage.getItem()

      //ny times call
      let nyUrl =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
        question +
        "&api-key=6p6VhtV9RUQZuaPRE6AOQWL2K9IwE9Ef";

      fetch(nyUrl)
        .then(function (response3) {
          return response3.json();
        })
        .then(function (data3) {
          console.log(data3.response.docs[0].snippet);
          let container = document.createElement("h4");
          container.textContent = data3.response.docs[0].snippet;
          title.appendChild(container);
        });

      //3rd call
      for (i = 0; i < example.length; i++) {
        let requestUrl2 =
          "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
          example[i] +
          "&limit=5";

        fetch(requestUrl2)
          .then(function (response2) {
            return response2.json();
          })
          .then(function (data2) {
            let container = document.createElement("a");
            container.href = data2[3][0];
            let lineBreak = document.createElement("br");
            container.innerText = "Click here for wiki link!";
            console.log(data2[3][0]);
            title.appendChild(container);
            title.appendChild(lineBreak);
          });
      }
      searchValue.value = "";
      let container = document.createElement("h4");
      container.setAttribute("id", "page");
      example.forEach(function (example) {
        let container = document.createElement("h4");
        container.textContent = example;
        title.appendChild(container);
      });
      console.log(example.length);
    });
>>>>>>> 606c5ba0ab06163345dad6a8c2d98ff3edb49fdb
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
