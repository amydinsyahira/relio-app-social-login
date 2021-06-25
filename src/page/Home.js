import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./Home.css";

export default function Home() {
  const [googleLoginUrl, setGoogleLoginUrl] = useState('')

  useEffect(() => {
    getGoogleLoginUrl()
  }, [])

  const getGoogleLoginUrl = async () => {
    try {
      const {data} = await axios({
        url: "https://relioapi.amydin.site/api/v1/user/login/url",
        method: "get",
      })
      setGoogleLoginUrl(data.googleUrl)
    } catch (err) {
      console.log(err)
    }
  }

  const popUpLogin = (type) => {
    if (!googleLoginUrl) return

    switch (type) {
      case "google":
        window.open(googleLoginUrl, 'popup', 'width=600,height=600')
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <div className="container">
            <div className="row">
              <h2 style={{ textAlign: "center" }}>Login with Social Media</h2>

              <div className="col">
                <button onClick={() => popUpLogin("google")} className="google btn">
                  <i className="fa fa-google fa-fw"></i> Login with Google
                </button>
                <button onClick={() => popUpLogin("facebook")} className="fb btn">
                  <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                </button>
              </div>
            </div>
        </div>
      </header>
    </div>
  );
}