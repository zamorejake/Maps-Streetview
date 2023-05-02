let example = [];
let submitButton = document.getElementById("submit");
let searchValue = document.getElementById("search");
let title = document.getElementById("title");

let nyurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=6p6VhtV9RUQZuaPRE6AOQWL2K9IwE9Ef'

fetch(nyurl)
        .then(function (response3) {
          return response3;
        })
        .then(function (data3) {
          console.log(data3);
        });

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  let question = searchValue.value;
  let requestUrl =
        "https://developer.nps.gov/api/v1/parks?limit=5&q=" +
        question +
        "&api_key=zcVsmk0xbipvcZpXfFUHrZuNkcfpYUIRiuic2fh1";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (i = 0; i < data.data.length; i++) {
        example.push(data.data[i].fullName);
        localStorage.setItem("12345"[i], example[i]);
      }
      //console.log(example[0]);

      //local storage stuff
      // localStorage.setItem(example[0], example[0]);
      //localStorage.getItem()

      //2nd call
      let requestUrl2 =
        "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
        example[0] +
        "&limit=5";

      fetch(requestUrl2)
        .then(function (response2) {
          return response2;
        })
        .then(function (data2) {
          console.log(data2.url);
        });
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

  //set items on page
});
