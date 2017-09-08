import React from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

import FunnyGif from '../../components/FunnyGif/FunnyGif';
import './Index.scss';

const Boilerlate = () => (
  <div>
    <h1>Vaultoro Test</h1>
    <p>A boilerplate for products.</p>
    <div>
      <Button href="http://cleverbeagle.com/pup">Read the Docs</Button>
      <Button href="https://github.com/cleverbeagle/pup"><i className="fa fa-star" /> Star on GitHub</Button>
    </div>
    <footer>
      <p>Need help and want to stay accountable building your product? <a href="http://cleverbeagle.com?utm_source=pupappindex&utm_campaign=oss">Check out Clever Beagle</a>.</p>
    </footer>
  </div>
);

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      randomGif: '',
      loadingGif: true,
    };
  }
  componentDidMount() {
    // hard coded api key for now instead of config file, not sure what the rate limit is
    const xhr = $.get('http://api.giphy.com/v1/gifs/random?api_key=1c12272c7b264df6858705989f47ca59');
    xhr.done(
      (response) => {
        if (response.meta.status === 200) {
          const randomGifId = response.data.id;
          this.setState({
            randomGif: `https://i.giphy.com/${randomGifId}.gif`,
            loadingGif: false,
          });
        }
      });
  }
  render() {
    return (
      <div className="Index">
        <FunnyGif
          gifUrl={this.state.randomGif}
          loadingGif={this.state.loadingGif}
        />
        <Boilerlate />
      </div>
    );
  }
}
