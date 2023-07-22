import * as React from 'react';
import { colors, api_url } from './data';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

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
  async getApi() {
    // Storing response

    await fetch(api_url)
      .then((response) => response.json())
      .then((data) => {
        {
          
          if (data !== null && data.quotes.length > 0) {
           
            this.setState({
              quotes: [...data.quotes],
            }, () =>{
              
              if (this.state.quotes.length > 0) {
                this.getNewQuote();
              }
            });

            //make sure to put a callback in setState to get current state

           
          }
        }
      })

    // Storing data in form of JSON
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

  componentDidMount() {

    console.log(this.state);
    console.log("xxxx")
    // Defining async function
    if (this.state.quotes.length < 1) {
      console.log("yyyy")
      //this kept return empty
      this.getApi();
    } else {
      this.getNewQuote();
    }
  }

  render() {
    const { quote, author, color } = this.state;

    const el: any = document.getElementsByTagName('body')[0];

    el.style.backgroundColor = color;
    el.style.color = color;

    return (
      <div id="wrapper">
        <div id="quote-box">
          {quote && author && (
            <>
              <p id="text">
                <FontAwesomeIcon icon={faQuoteLeft} /> {quote}
              </p>
              <p id="author">- {author}</p>
            </>
          )}
          <div id="buttons">
            <a
              className="button"
              href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22Fall%20seven%20times%20and%20stand%20up%20eight.%22%20Japanese%20Proverb"
              title="Post this quote on twitter!"
              target="_top"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="twitter-button"
                style={{ backgroundColor: color ?? colors[0] }}
              />
            </a>
            <a
              className="button"
              href="https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Japanese%20Proverb&content=Fall%20seven%20times%20and%20stand%20up%20eight.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
              title="Post this quote on tumblr!"
              target="_top"
            >
              <FontAwesomeIcon
                icon={faTumblr}
                className="tumblr-button"
                style={{ backgroundColor: color ?? colors[0] }}
              />
            </a>

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
 * https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Japanese%20Proverb&content=Fall%20seven%20times%20and%20stand%20up%20eight.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button
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
