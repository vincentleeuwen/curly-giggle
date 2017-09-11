import { Migrations } from 'meteor/percolate:migrations';
import Documents from '../imports/api/Documents/Documents';

Migrations.add({
  version: 1,
  up() {
    Documents.find({rating: {$exists: false}}).forEach(doc => {
      const defaultRating = 3;
      Documents.update(doc._id, {$set: {defaultRating}});
    });
  },
  down() {
    Documents.update({}, {$unset: {todoCount: true}}, {multi: true});
  },
});
