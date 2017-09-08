import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';

const FunnyGif = props => (
  <div>
    {
      props.loadingGif &&
        <Loading />
    }
    {
      !props.loadingGif &&
        <img
          src={props.gifUrl}
          alt="Funny Gif"
        />
    }
  </div>
);

FunnyGif.propTypes = {
  gifUrl: PropTypes.string.isRequired,
  loadingGif: PropTypes.bool.isRequired,
};

export default FunnyGif;
