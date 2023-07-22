import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFontAwesome,
  faTumblr,
} from '@fortawesome/free-brands-svg-icons';

const api_url =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
];

export default class RandomQuote extends React.Component<
  {},
  { quotes: any[]; index: number; author: string; quote: string; color: string }
> {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      author: '',
      quote: '',
      index: 0,
      color: colors[0],
    };

    this.getApi = this.getApi.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
  }
  async getApi(url) {
    // Storing response

    const response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    console.log(data, data.quotes);
    //console.log(data.quotes[0]);
    if (data !== null && data.quotes.length > 0) {
      this.setState({
        quotes: [...data.quotes],
      });
    }

    console.log(this.state.quotes, 'x');

    if (this.state.quotes.length > 0) {
      this.getNewQuote();
    }
  }

  getNewQuote() {
    const index = Math.floor(Math.random() * this.state.quotes.length);
    const quotes = this.state.quotes[index];
    const color = colors[Math.floor(Math.random() * colors.length)];

    this.setState({
      quote: quotes.quote,
      author: quotes.author,
      color: color,
    });
  }
  //

  componentDidMount() {
    // Defining async function
    if (this.state.quotes.length < 1) {
      this.getApi(api_url);
    }
  }

  render() {
    const { quotes, quote, author, color } = this.state;

    // const index = Math.floor(Math.random() *103);
    console.log(color);

    const el: any = document.getElementsByTagName('body')[0];

    el.style.backgroundColor = color;

    return (
      <div id="wrapper" style={{ margin: 0, padding: 10 }}>
        <div id="quote-box">
          {quote && author && (
            <>
              <p id="text">{quote}</p>
              <p id="author">- {author}</p>
            </>
          )}

          <div id="buttons">
            <FontAwesomeIcon
              icon={faTwitter}
              className="twitter-button"
              style={{ backgroundColor: color ?? colors[0] }}
            />
            <FontAwesomeIcon
              icon={faTumblr}
              className="tumblr-button"
              style={{ backgroundColor: color ?? colors[0] }}
            />
            <button
              id="new-quote"
              className="newQuote-button"
              onClick={this.getNewQuote}
              style={{ backgroundColor: color ?? colors[0] }}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * 
 * User Story #1: I can see a wrapper element with a corresponding id="quote-box".

User Story #2: Within #quote-box, I can see an element with a corresponding id="text".

User Story #3: Within #quote-box, I can see an element with a corresponding id="author".

User Story #4: Within #quote-box, I can see a clickable element with a corresponding id="new-quote".

User Story #5: Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote".

User Story #6: On first load, my quote machine displays a random quote in the element with id="text".

User Story #7: On first load, my quote machine displays the random quote's author in the element with id="author".

User Story #8: When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element.

User Story #9: My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.

User Story #10: I can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote.

User Story #11: The #quote-box wrapper element should be horizontally centered. Please run tests with browser's zoom level at 100% and page maximized.
 */
