import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './Rating.scss';

const Rating = props => (
  <div className="rating">
    {[...Array(props.rating)].map((x, i) =>
      <Glyphicon glyph="star" key={i} />
    )}
  </div>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
