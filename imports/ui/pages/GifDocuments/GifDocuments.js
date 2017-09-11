import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import DocumentsCollection from '../../../api/Documents/Documents';
import Documents from '../../components/Documents/Documents';

export default createContainer(() => {
  const subscription = Meteor.subscribe('documents');
  return {
    loading: !subscription.ready(),
    documents: DocumentsCollection.find({ body: { $regex: '.gif' } }).fetch(),
    listTitle: 'Gif documents',
  };
}, Documents);
