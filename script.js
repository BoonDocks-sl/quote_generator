const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twt');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = null;

// show loading spinner
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}

// show new quote
function newQuote() {
    showLoadingSpinner();

    // Use the data from the fetched API quote
    const quote = apiQuote.data;

    // check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // check quote length to determine styling
    if (quote.content.length > 110) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // set Quote, hide loader
    quoteText.textContent = quote.content;
    removeLoadingSpinner();
}

// get quote from the API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
    } catch (error) {
        // handle error
        console.error('Error fetching quote:', error);
        removeLoadingSpinner(); // Ensure loader is hidden even in case of an error
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote(); 
