import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as queryString from "query-string";

export default function Auth() {
  const { typeAuth } = useParams();

  useEffect((typeAuth) => {
    switch (typeAuth) {
      case "google":
        getTheGoogleCode()
        break;
    
      default:
        break;
    }
  }, [typeAuth])

  const getTheGoogleCode = () => {
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.error) {
      alert(`An error occurred: ${urlParams.error}`);
    } else {
      alert(`The code is: ${urlParams.code}`);
    }

    window.close()
  }

  return (
    <h2>Please wait...</h2>
  )
}