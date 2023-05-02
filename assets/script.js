let example = [];
let submitButton = document.getElementById("submit");
let searchValue = document.getElementById("search");
let title = document.getElementById("title");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  var userSearch = searchValue.value;
  localStorage.setItem('searchInput',JSON.stringify(userSearch))
  fetchAPI(userSearch)
});


function renderNYTArticle (data) {
  var articleHeader = data.response.docs[0].headline.main
  var articleSnippet = data.response.docs[0].snippet
  var articleURL = data.response.docs[0].web_url
  if (data.response.docs[0].multimedia[0] !== undefined) {
    var imgURL = data.response.docs[0].multimedia[0].url
  } 
  
  
  //
  var articleDivEl = document.createElement('div')
  articleDivEl.setAttribute('style','display: flex; align-items: center;')
  articleDivEl.setAttribute('id','article-container')
  title.appendChild(articleDivEl)

  if (data.response.docs[0].multimedia[0] !==undefined) {
    var imgEl = document.createElement('img')
    imgEl.setAttribute('src','https://www.nytimes.com/'+imgURL)
    imgEl.setAttribute('style','width: 300px; height: auto;')
  }

  var articleContainerEl = document.createElement('div')
  articleContainerEl.setAttribute('style','display: flex; flex-direction: column; justify-content: space-between; height: 300px; align-items: center')
  var headerEl = document.createElement('h4')
  headerEl.textContent = articleHeader
  var snippetEl = document.createElement('p')
  snippetEl.textContent = articleSnippet
  var articleLinkEl = document.createElement('a')
  articleLinkEl.setAttribute('href', articleURL)
  userSearch = JSON.parse(localStorage.getItem('searchInput'))
  articleLinkEl.textContent = 'View This Recent New York Times Article Related to - '+userSearch.toUpperCase();
  


  if (data.response.docs[0].multimedia[0] !== undefined) {
    articleDivEl.appendChild(imgEl)
  } 
  articleDivEl.appendChild(articleContainerEl)
  articleContainerEl.appendChild(headerEl)
  articleContainerEl.appendChild(snippetEl)
  articleContainerEl.appendChild(articleLinkEl)
}

function renderWikiLink (data2) {
  var wikipediaURL = data2[3][0]
  var wikiContainerEl = document.createElement('div')
  wikiContainerEl.setAttribute('style', 'display: flex; flex-direction: column;')
  wikiContainerEl.setAttribute('id', 'wiki-container')
  var wikicontainertextEl = document.createElement('h2')
  wikicontainertextEl.textContent = 'Wikipedia:'
  var wikipediaLinkEl = document.createElement('a')
  wikipediaLinkEl.setAttribute('href', wikipediaURL)
  wikipediaLinkEl.textContent = 'Interested in more information?'
  title.appendChild(wikiContainerEl)
  wikiContainerEl.appendChild(wikicontainertextEl)
  wikiContainerEl.appendChild(wikipediaLinkEl)
}

function renderParkData (d) {
  var parkName = d.data[0].fullName
  var parkDescription = d.data[0].description
  var parkIMG = d.data[0].images[0].url
  var parkDirections = d.data[0].directionsUrl
  var parkAddress = d.data[0].addresses[0].line1+', '+d.data[0].addresses[0].city+', '+d.data[0].addresses[0].stateCode+' '+d.data[0].addresses[0].postalCode
  var parkEmail = d.data[0].contacts.emailAddresses[0].emailAddress
  var parkEmailDescription = d.data[0].contacts.emailAddresses[0].description
  var parkNumber = d.data[0].contacts.phoneNumbers[0].phoneNumber
  
  console.log(parkName)
  console.log(parkDescription)
  console.log(parkIMG)
  console.log(parkDirections)
  console.log(parkAddress)
  console.log(parkEmail )
  console.log(parkEmailDescription)
  console.log(parkNumber)
}

function fetchAPI (userSearch) {
  var NYTrequest = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + userSearch + '&api-key=6p6VhtV9RUQZuaPRE6AOQWL2K9IwE9Ef'
  fetch(NYTrequest).then(function (res) {
    return res.json();
  }).then(function (data) {
    renderNYTArticle(data)

    //wikipedia link
    var WIKIrequest = "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" + userSearch + "&limit=1"
    fetch(WIKIrequest).then(function (response) {
      return response.json();
    }).then( function (data2) {
      renderWikiLink(data2)
    })

    //national park service
    var parkRequest = 'https://developer.nps.gov/api/v1/parks?parkCode=&limit=1&q='+userSearch+'&sort=&api_key=zcVsmk0xbipvcZpXfFUHrZuNkcfpYUIRiuic2fh1'
    fetch(parkRequest).then(function (r) {
      return r.json();
    }).then(function(d) {
      renderParkData(d)
    })
  })


  //clear button
  var clearBtnEl = document.createElement('button')
  clearBtnEl.setAttribute('class','button is-warning')
  clearBtnEl.setAttribute('id','clear')
  clearBtnEl.textContent = 'Clear'
  document.body.appendChild(clearBtnEl)

  
  clearBtnEl.addEventListener('click', function () {
    var wikiContainerEl = document.querySelector('#wiki-container')
    var articleDivEl = document.querySelector('#article-container')
    var clearBtnEl = document.querySelector('#clear')
    wikiContainerEl.remove();
    articleDivEl.remove();
    clearBtnEl.remove();
  })
}