const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let Location = window.location
let destinationPage = params.page

function createItems(data) {
	data.results.forEach(function(result, i) {
		document.querySelector('.results').append(document.createElement("div"))
		document.querySelectorAll('.results > div')[i].classList.add("resultItem")
		document.querySelectorAll('.resultItem')[i].append(document.createElement("img"))
		document.querySelectorAll('.resultItem img')[i].setAttribute('src', result.thumbnailImageUrl)
		document.querySelectorAll('.resultItem')[i].append(document.createElement("h4"))
		document.querySelectorAll('.resultItem h4')[i].innerHTML = result.name
		document.querySelectorAll('.resultItem')[i].append(document.createElement("div"))
		document.querySelectorAll('.resultItem div')[i].append(document.createElement("h6"))
		document.querySelectorAll('.resultItem div h6')[i].innerHTML = "$" + result.price
		document.querySelectorAll('.resultItem div')[i].append(document.createElement("p"))
		if(result.msrp) {
			if(result.msrp > result.price) {
				document.querySelectorAll('.resultItem div p')[i].innerHTML = "$" + result.msrp
			}
		}
	});
	createButtons(data);
}
function createButtons(data) {
	if(data.pagination.currentPage != data.pagination.totalPages) {
		document.querySelector('.pageButtonsTop .nextButton').classList.remove('hidden')
		document.querySelector('.pageButtonsBottom .nextButton').classList.remove('hidden')

	}
	
	if(data.pagination.currentPage != 1) {
		document.querySelector('.pageButtonsTop .prevButton').classList.remove('hidden')
		document.querySelector('.pageButtonsBottom .prevButton').classList.remove('hidden')
	}
}
function search() {
	let searchQuery = document.querySelector('.searchbar input').value;
	Location.assign('/?resultsFormat=native&page=1&q=' + searchQuery)
}
function bindEnter() {
		document.getElementById('searchInput').addEventListener("keypress", function(event){
		if(event.key === "Enter") {
			event.preventDefault();
			document.querySelector('#enterButton').click();
		}
	});
}
function changePage(page) {
	switch(page) {
		case 'next':
			destinationPage++
			Location.assign('/?resultsFormat=native&page=' + destinationPage + '&q=' + params.q)
			break;
		case 'prev': 
			destinationPage--
			Location.assign('/?resultsFormat=native&page=' + destinationPage + '&q=' + params.q)
	};
}
window.onload = function() {
	bindEnter()
	fetch('https://scmq7n.a.searchspring.io/api/search/search.json/?siteId=scmq7n&resultsFormat=native&page=' + params.page + '&q=' + params.q)
	.then(response => response.json())
	.then(data => createItems(data));
};


