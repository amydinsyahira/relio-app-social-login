import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as queryString from "query-string";
import axios from "axios";

export default function Auth() {
  const { typeAuth } = useParams();

  useEffect(() => {
    switch (typeAuth) {
      case "google":
        getTheGoogleCode()
        break;
    
      default:
        break;
    }
  }, [typeAuth])

  const getTheGoogleCode = async () => {
    const urlParams = queryString.parse(window.location.search);
    
    if (Object.keys(urlParams).length === 0) return window.close()
    if (urlParams.error) {
      alert(`An error occurred: ${urlParams.error}`);
    } else {
      const {data} = await axios({
        url: `https://api.relio.app/api/v1/user/auth/google?code=${urlParams.code}`,
        method: "get",
      })
      alert(JSON.stringify(data))
    }
    window.close()
  }

  return (
    <p>Please wait...</p>
  )
}