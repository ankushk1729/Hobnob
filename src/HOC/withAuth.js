import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

import { verifyToken } from '../utils/token';

const withAuth = (WrappedComponent) => {
    return (props) => {
      const Router = useRouter();
      const [verified, setVerified] = useState(false);
  
      useEffect(async () => {
        const accessToken = cookie.get('token')
        // if no accessToken was found,then we redirect to "/login" page.
        if (!accessToken) {
          Router.replace("/login");
        } else {
          // we call the api that verifies the token.
          const data = await verifyToken(accessToken);
          // if token was verified we set the state.
          if (data.verified) {
            setVerified(data.verified);
          } else {
            // If the token was fraud we first remove it from cookie and then redirect to "/"
            cookie.remove("token");
            Router.replace("/login");
          }
        }
      }, []);
  
      if (verified) {
        return <WrappedComponent {...props} />;
      } else {
        return null;
      }
    };
  };

export default withAuth;