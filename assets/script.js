let example = [];
let submitButton = document.getElementById("submit");
let searchValue = document.getElementById("search");
let title = document.getElementById("title");

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
  var userSearch = searchValue.value;
  fetchAPI(userSearch)
});

function fetchAPI (userSearch) {
  var NYTrequest = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + userSearch + '&api-key=6p6VhtV9RUQZuaPRE6AOQWL2K9IwE9Ef'
  fetch(NYTrequest).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data)
    renderNYTArticle(data)

    //wikipedia link
    var WIKIrequest = "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" + userSearch + "&limit=1"
    fetch(WIKIrequest).then(function (response) {
      return response.json();
    }).then( function (data2) {
      renderWikiLink(data2)
    })
  })
}

function renderNYTArticle (data) {
  var articleHeader = data.response.docs[0].headline.main
  var articleSnippet = data.response.docs[0].snippet
  var articleURL = data.response.docs[0].web_url
  var imgURL = data.response.docs[0].multimedia[0].url
  
  //
  var articleDivEl = document.createElement('div')
  articleDivEl.setAttribute('style','display: flex; align-items: center;')
  title.appendChild(articleDivEl)

  var imgEl = document.createElement('img')
  imgEl.setAttribute('src','https://www.nytimes.com/'+imgURL)
  imgEl.setAttribute('style','width: 300px; height: auto;')

  var articleContainerEl = document.createElement('div')
  articleContainerEl.setAttribute('style','display: flex; flex-direction: column; justify-content: space-between; height: 300px; align-items: center')
  var headerEl = document.createElement('h4')
  headerEl.textContent = articleHeader
  var snippetEl = document.createElement('p')
  snippetEl.textContent = articleSnippet
  var articleLinkEl = document.createElement('a')
  articleLinkEl.setAttribute('href', articleURL)
  articleLinkEl.textContent = 'click here to view this New York Times Article'
  


  articleDivEl.appendChild(imgEl)
  articleDivEl.appendChild(articleContainerEl)
  articleContainerEl.appendChild(headerEl)
  articleContainerEl.appendChild(snippetEl)
  articleContainerEl.appendChild(articleLinkEl)
}

function renderWikiLink (data2) {
  var wikipediaURL = data2[3][0]
  var wikiContainerEl = document.createElement('div')
  wikiContainerEl.setAttribute('style', 'display: flex; flex-direction: column;')
  var wikicontainertextEl = document.createElement('h2')
  wikicontainertextEl.textContent = 'Wikipedia:'
  var wikipediaLinkEl = document.createElement('a')
  wikipediaLinkEl.setAttribute('href', wikipediaURL)
  wikipediaLinkEl.textContent = 'Interested in more information?'
  title.appendChild(wikiContainerEl)
  wikiContainerEl.appendChild(wikicontainertextEl)
  wikiContainerEl.appendChild(wikipediaLinkEl)
}

// let requestUrl =
//     "https://developer.nps.gov/api/v1/parks?limit=1&q=" +
//     userSearch +
//     "&api_key=zcVsmk0xbipvcZpXfFUHrZuNkcfpYUIRiuic2fh1";
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
//       //local storage stuff

//       //console.log(example[0]);
//       //local storage stuff
//       // localStorage.setItem(example[0], example[0]);
//       //localStorage.getItem()

//       //ny times call
//       let nyUrl =
//         "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
//         userSearch +
//         "&api-key=6p6VhtV9RUQZuaPRE6AOQWL2K9IwE9Ef";

//       fetch(nyUrl)
//         .then(function (response3) {
//           return response3.json();
//         })
//         .then(function (data3) {
//           console.log(data3.response.docs[0].snippet);
//           let container = document.createElement("h4");
//           container.textContent = data3.response.docs[0].snippet;
//           title.appendChild(container);
//         });

//       //3rd call
//       for (i = 0; i < example.length; i++) {
//         let requestUrl2 =
//           "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
//           example[i] +
//           "&limit=5";

//         fetch(requestUrl2)
//           .then(function (response2) {
//             return response2.json();
//           })
//           .then(function (data2) {
//             let container = document.createElement("a");
//             container.href = data2[3][0];
//             let lineBreak = document.createElement("br");
//             container.innerText = "Click here for wiki link!";
//             console.log(data2[3][0]);
//             title.appendChild(container);
//             title.appendChild(lineBreak);
//           });
//       }
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