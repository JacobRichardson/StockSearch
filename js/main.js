//Init function.
const init = async () => {
  //Use the fetch to bring in the config file.
  const res = await fetch('./js/config.json');

  //Parse the config file to json.
  const config = await res.json();

  //Variable for the search input.
  const search = document.getElementById('search');

  //Variable for the match list.
  const matchList = document.getElementById('match-list');

  //Add an event listener to the input calling search video games with the input.
  search.addEventListener('input', () => searchStock(search.value));

  //Function to handle searching for stocks.
  const searchStock = async searchText => {
    //If the search text is empty.
    if (searchText.length == 0) {
      //Clear the match list.
      matchList.innerHTML = '';
    } else {
      //Get the matching stocks using axios and the search text.
      const response = await axios({
        url:
          'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' +
          //Fill in keywords with the search text.
          searchText +
          '&apikey=' +
          //Place in the api key from the config file.
          config.key,
        method: 'GET'
      });
      //Call output html with the data retrieved from the api.
      outputHtml(response.data.bestMatches);
    }
  };

  //Function that creates the output html.
  const outputHtml = stocks => {
    //If there are stocks.
    if (stocks.length > 0) {
      //Map over each stock creating html.
      let html = stocks.map(
        stock =>
          `
            <div class="card card-body mb-4">
                <h4>
                    ${stock['2. name']}
                    <span class="text-primary">${stock['1. symbol']}<span>
                </h4>
            </div>
        `
      );
      //Create a single string.
      html = html.join('');

      //Set the match list's html to the html variable.
      matchList.innerHTML = html;
    }
  };
};

//Call init.
init();
