/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class DocumentEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        body: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        body: {
          required: 'This thneeds a body, please.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingDocument = this.props.doc && this.props.doc._id;
    const methodToCall = existingDocument ? 'documents.update' : 'documents.insert';
    const doc = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
      rating: parseInt(this.rating.value, 10),
    };

    if (existingDocument) doc._id = existingDocument;

    Meteor.call(methodToCall, doc, (error, documentId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/documents/${documentId}`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={doc && doc.title}
          placeholder="Oh, The Places You'll Go!"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>GIF url</ControlLabel>
        <input
          className="form-control"
          type="url"
          name="GIF url"
          ref={body => (this.body = body)}
          defaultValue={doc && doc.body}
          placeholder="Insert gif url"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Rating</ControlLabel>
        <input
          className="form-control"
          type="number"
          min="1"
          max="5"
          name="Rating"
          ref={rating => (this.rating = rating)}
          defaultValue={doc && doc.rating}
          placeholder="Rating"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {doc && doc._id ? 'Save Changes' : 'Add Document'}
      </Button>
    </form>);
  }
}

DocumentEditor.defaultProps = {
  doc: { title: '', body: '', rating: '' },
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default DocumentEditor;
