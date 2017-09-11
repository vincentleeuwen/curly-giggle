import React from 'react';
import PropTypes from 'prop-types';
import YoutubeEmbedVideo from 'youtube-embed-video';

const DocBody = props => (
  <div>
    {
      props.url.includes('.gif') &&
        <img src={props.url} alt={props.title} />
    }
    {
      props.url.includes('youtube.com') &&
        <YoutubeEmbedVideo videoId={props.url.match(/youtube\.com.*?v[=](\w+)/)[1]} suggestions={false} />
    }
  </div>
);

DocBody.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DocBody;
