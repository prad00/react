import React from 'react';
import {createStreams} from '../../actions'
import {connect} from 'react-redux'

import StreamForm from './StreamForm'

class StreamCreate extends React.Component {

  onSubmit = (formValues) => {
    this.props.createStreams(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm onSubmit={this.onSubmit}></StreamForm>
      </div>
    );
  }
}



export default connect(null,{createStreams})(StreamCreate)