import React from 'react'
import {connect} from 'react-redux'
import {onSignedIn} from '../actions'


class GoogleAuth extends React.Component {
    // state= {isSignedIn:null}
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
           window.gapi.client.init({
                clientId:'214524648543-av1uvtjkh5rgoikj95plq4ssr62ks3dk.apps.googleusercontent.com',
                scope:'email'
           }).then(()=>{
               this.auth = window.gapi.auth2.getAuthInstance();
              //  this.setState({isSignedIn:this.auth.isSignedIn.get()})
              // this.props.onSignedIn(this.auth.isSignedIn.get(),this.auth.currentUser.get().getId())
              this.onAuthChange()
               this.auth.isSignedIn.listen(this.onAuthChange)
           })
        });
    }

    onAuthChange = () => {
      this.props.onSignedIn(this.auth.isSignedIn.get(),this.auth.currentUser.get().getId())
      // this.props.onSignedIn(this.auth.isSignedIn.get());
    }

    onSignIn = () => {
        this.auth.signIn();
      };
    
      onSignOut = () => {
        this.auth.signOut();
      };
    
    renderAuthButton() {
        if (this.props.isSignedIn?.signedInStatus === undefined) {
          return null;
        } else if (this.props.isSignedIn?.signedInStatus) {
          return (
            <button onClick={this.onSignOut} className="ui red google button">
              <i className="google icon" />
              Sign Out
            </button>
          );
        } else {
          return (
            <button onClick={this.onSignIn} className="ui red google button">
              <i className="google icon" />
              Sign In with Google
            </button>
          );
        }
      }

    render() {
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }

}

const onMapStateToProps = (state) => {
  return {isSignedIn:state.googleSignedIn}
}

export default connect(onMapStateToProps,{onSignedIn})(GoogleAuth);