import { useEffect } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import logo from "./logo.svg";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    firebaseInitialApp()
  }, [])

  const firebaseInitialApp = () => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  const firebaseLogin = (type) => {
    let provider
    switch (type) {
      case "google":
        provider = new firebase.auth.GoogleAuthProvider();
        break;
    
      default:
        return alert('On going to development...')
    }

    firebase.auth()
      .signInWithPopup(provider)
      .then(() => {
        firebase.auth()
          .currentUser
          .getIdToken(true)
          .then(async (idToken) => {
          // Send token to your backend via HTTPS
            const { data } = await axios({
              url: `${process.env.REACT_APP_BACKEND}/api/v1/user/login`,
              method: "post",
              data: { idToken }
            })
            alert(JSON.stringify(data))
          }).catch((error) => {
            console.log(error)
          });
      }).catch((error) => {
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // The email of the user's account used.
        //var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        //var credential = error.credential;
        console.log(error)
      })
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <div className="container">
            <div className="row">
              <h2 style={{ textAlign: "center" }}>Sign-in with firebase</h2>

              <div className="col">
                <button onClick={() => firebaseLogin("google")} className="google btn">
                  <i className="fa fa-google fa-fw"></i> Login with Google
                </button>
                <button onClick={() => firebaseLogin("facebook")} className="fb btn">
                  <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                </button>
              </div>
            </div>
        </div>
      </header>
    </div>
  );
}