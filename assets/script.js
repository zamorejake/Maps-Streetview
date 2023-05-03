let example = [];
let submitButton = document.getElementById("submit");
let searchValue = document.getElementById("search");
let title = document.getElementById("title");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  var userSearch = searchValue.value;
  //Add if statement to check if userSearch is an actual US National Park
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
  
  var title = document.querySelector('#title')
  title.setAttribute('style','justify-content: center')
  //
  var articleDivEl = document.createElement('div')
  articleDivEl.setAttribute('style','display: flex; align-items: center; width: 50%;')
  articleDivEl.setAttribute('id','article-container')
  title.appendChild(articleDivEl)

  if (data.response.docs[0].multimedia[0] !==undefined) {
    var imgEl = document.createElement('img')
    imgEl.setAttribute('src','https://www.nytimes.com/'+imgURL)
    imgEl.setAttribute('style','width: 100px; height: auto;')
  }

  var articleContainerEl = document.createElement('div')
  articleContainerEl.setAttribute('style','display: flex; flex-direction: column; height: auto; align-items: center;')
  var headerEl = document.createElement('h4')
  headerEl.setAttribute('style','font-size: 14px;')
  headerEl.textContent = articleHeader
  var snippetEl = document.createElement('p')
  snippetEl.setAttribute('style','font-size: 12px;')
  snippetEl.textContent = articleSnippet
  var articleLinkEl = document.createElement('a')
  articleLinkEl.setAttribute('href', articleURL)
  articleLinkEl.setAttribute('style','font-size: 12px;')
  userSearch = JSON.parse(localStorage.getItem('searchInput'))
  articleLinkEl.textContent = 'View This Recent New York Times Article Related to - '+userSearch.toUpperCase();
  


  
  articleDivEl.appendChild(articleContainerEl)
  articleContainerEl.appendChild(headerEl)
  if (data.response.docs[0].multimedia[0] !== undefined) {
    articleContainerEl.appendChild(imgEl)
  } 
  articleContainerEl.appendChild(snippetEl)
  articleContainerEl.appendChild(articleLinkEl)
}

function renderWikiLink (data2) {
  var wikipediaURL = data2[3][0]
  var wikiContainerEl = document.createElement('div')
  wikiContainerEl.setAttribute('style', 'display: flex; flex-direction: column;')
  wikiContainerEl.setAttribute('id', 'wiki-container')
  var wikicontainertextEl = document.createElement('h2')
  wikicontainertextEl.setAttribute('style','font-size: 14px;')
  wikicontainertextEl.textContent = 'Wikipedia:'
  var wikipediaLinkEl = document.createElement('a')
  wikipediaLinkEl.setAttribute('style','font-size: 12px;')
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
  

  var parkDivEl = document.createElement('div')
  parkDivEl.setAttribute('style','display: flex; justify-content: center;')
  var parkContainerEl = document.createElement('div')
  parkContainerEl.setAttribute('id','park-container')
  parkContainerEl.setAttribute('style','display: flex; flex-wrap: wrap; flex-direction: column; align-items: center; justify-content: center; width: 80%;')
  

  var parkNameEl =  document.createElement('h2')
  parkNameEl.setAttribute('style','font-size: 32px')
  parkNameEl.textContent = parkName
  
  var parkIMGEl = document.createElement('img')
  parkIMGEl.setAttribute('src',parkIMG)
  parkIMGEl.setAttribute('style','width: 250px; height: 250px;')
  
  parkDescriptionEl = document.createElement('p')
  parkDescriptionEl.setAttribute('style','font-size: 25px; margin: 15px;')
  parkDescriptionEl.textContent = parkDescription

  var contactEl = document.createElement('div')
  contactEl.setAttribute('style','display: flex; flex-direction: column; margin: 5px;')
  
  var contactHeaderEl = document.createElement('h3')
  contactHeaderEl.setAttribute('style','font-size: 16px;')
  contactHeaderEl.textContent = 'Come visit '+parkName+':'

  var emailEl = document.createElement('a')
  emailEl.textContent = parkEmailDescription
  emailEl.setAttribute('style','font-size: 16px;')
  emailEl.setAttribute('href','mailto:'+parkEmail)

  var parkNumberEl = document.createElement('p')
  parkNumberEl.setAttribute('style','font-size: 16px;')
  parkNumberEl.textContent = 'Phone number: '+parkNumber

  var parkAddressEl = document.createElement('a')
  parkAddressEl.setAttribute('href', parkDirections)
  parkAddressEl.setAttribute('style','font-size: 16px;')
  parkAddressEl.textContent = 'Directions to '+ parkName.toUpperCase()


  //append elements
  document.body.appendChild(parkDivEl)
  parkDivEl.appendChild(parkContainerEl)
  parkContainerEl.appendChild(parkNameEl)
  parkContainerEl.appendChild(parkIMGEl)
  parkContainerEl.appendChild(parkDescriptionEl)
  parkContainerEl.appendChild(contactEl)
  contactEl.appendChild(contactHeaderEl)
  contactEl.appendChild(emailEl)
  contactEl.appendChild(parkNumberEl)
  contactEl.appendChild(parkAddressEl)


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
  clearBtnEl.setAttribute('id','submit')
  clearBtnEl.textContent = 'Clear'
  document.body.appendChild(clearBtnEl)

  
  clearBtnEl.addEventListener('click', function () {
    var wikiContainerEl = document.querySelector('#wiki-container')
    var articleDivEl = document.querySelector('#article-container')
    var clearBtnEl = document.querySelector('#clear')
    var parkContainerEl = document.querySelector('#park-container')
    wikiContainerEl.remove();
    articleDivEl.remove();
    clearBtnEl.remove();
    parkContainerEl.remove();

  })
}
