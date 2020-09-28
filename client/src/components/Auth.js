import React, { useState, useEffect } from "react";
//import firebase from './firebase'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import ClientForm from './clientform';


function Auth() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });

    console.log("firebase mounted: ", firebase.auth());
  }, []);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  return (
    <div className="container">
      {isSignedIn ? (
        <div>
          <button className='signout btn btn-dark' onClick={() => firebase.auth().signOut()}>Sign Out</button>
          <div className="photo">
          <img
          style={{height: '100px'}}
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
             <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
        </div>
          <ClientForm />
        </div>
      ) : (
          <div className="authcontainer">
              <h1>Please Sign in with the following:</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        </div>
      )}
      </div>

  );
}

export default Auth;