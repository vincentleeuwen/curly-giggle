import React from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

const Index = () => (
  <div className="Index">
    <img
      src="https://i.giphy.com/73YmkGK4hDub6.gif"
      alt="Funny Gif"
    />
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

export default Index;
