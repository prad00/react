import React from 'react'
import {fetchStreams} from '../../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class StreamList extends React.Component {
    componentDidMount() {
      this.props.fetchStreams();
    }
    
    renderAdmin = (stream) => {
        if(!this.props.currentUserStatus) return
        if(this.props.currentUserId === undefined) return
        if(this.props.currentUserId === stream.currentUserId) {
            return (
                <div className="right floated content">
                  <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                  <Link className="ui button negative">Delete</Link>
                </div>
              );
        }
            
    }

    renderList = () => {
      return this.props.streams.map(stream => {
        return (
          <div className="item" key={stream.id}>
            <i className="large middle aligned icon camera" />
            <div className="content">
              {stream.title}
              <div className="description">{stream.description}</div>
            </div>
            {this.renderAdmin(stream)}
          </div>
        );
      });
    }

    renderCreate() {
      if (this.props.currentUserStatus) {
        return (
          <div style={{ textAlign: 'right' }}>
            <Link to="/streams/new" className="ui button primary">
              Create Stream
            </Link>
          </div>
        );
      }
    }
  
    render() {
      return (
        <div>
          <h2>Streams</h2>
          <div className="ui celled list">{this.renderList()}</div>
          {this.renderCreate()}
        </div>
      );
    }
  }

const mapStateToProps = (state) => {
    
    return ({ 
        streams: Object.values(state.streams), 
        currentUserId:state.googleSignedIn?.userId,
        currentUserStatus:state.googleSignedIn?.signedInStatus
    }); 
}

export default connect(mapStateToProps,{fetchStreams})(StreamList)