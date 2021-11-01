import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/streams/edit/${stream.id}`}>
            Edit
          </Link>

          <Link
            className='ui button negative'
            to={`/streams/delete/${stream.id}`}
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList = () => {
    return this.props.streams.map((stream) => {
      return (
        <div key={stream.id} className='item'>
          {this.renderAdmin(stream)}

          <i className='large middle aligned icon camera' />

          <div className='content'>
            <Link to={`/streams/${stream.id}`} className='header'>
              {stream.title}
            </Link>

            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Link className='ui button primary right floated' to='/streams/new'>
          Create Stream
        </Link>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, {
  fetchStreams
})(StreamList);