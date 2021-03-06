import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago, monthDayYearAtTime } from '@cleverbeagle/dates';
import { Bert } from 'meteor/themeteorchef:bert';

import Loading from '../Loading/Loading';
import Rating from '../Rating/Rating';
import DocBody from '../DocBody/DocBody';

import './Documents.scss';

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const Documents = ({ loading, documents, match, history, listTitle }) => (!loading ? (
  <div className="Documents">
    <div className="page-header clearfix">
      <h4 className="pull-left">{listTitle}</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Document</Link>
    </div>
    {documents.length ? <Table responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Gif</th>
          <th>Rating</th>
          <th>Last Updated</th>
          <th>Created</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {documents.map(({ _id, title, body, rating, createdAt, updatedAt }) => (
          <tr key={_id}>
            <td>{title}</td>
            <td><DocBody url={body} title={title} /></td>
            <td><Rating rating={rating} /></td>
            <td>{timeago(updatedAt)}</td>
            <td>{monthDayYearAtTime(createdAt)}</td>
            <td>
              <Button
                bsStyle="primary"
                onClick={() => history.push(`${match.url}/${_id}`)}
                block
              >View</Button>
            </td>
            <td>
              <Button
                bsStyle="danger"
                onClick={() => handleRemove(_id)}
                block
              >Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No documents yet!</Alert>}
  </div>
) : <Loading />);

Documents.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default Documents;
