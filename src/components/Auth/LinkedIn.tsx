import React, { useEffect, useRef, useContext } from "react";
import { useMutation } from "@apollo/client";
import LinkedInModal, { LinkedInToken } from "react-native-linkedin";
import Icons from "../svg";
import { IAuthResponse, ISocialNetworkVars } from "../../gql/User/mutations";
import { User } from "../../gql";
import { AuthContext } from "../../navigation/AuthContext";

const LinkedIn = () => {
  const { signIn } = useContext(AuthContext);
  const linkedRef = useRef<LinkedInModal>(null);

  const [linkedInLogin, { data: linkedInData }] = useMutation<
    { loginWithLinkedIn: IAuthResponse },
    ISocialNetworkVars
  >(User.mutations.loginWithLinkedIn);

  useEffect(() => {
    if (linkedInData) {
      const doSignIn = async () => {
        try {
          signIn(linkedInData.loginWithLinkedIn.accessToken);
        } catch (error) {
          console.error("error: ", error);
        }
      };

      doSignIn();
    }
  }, [linkedInData]);

  const login = (token: LinkedInToken) => {
    linkedInLogin({
      variables: {
        accessToken: `${token.access_token}`,
      },
    });
  };

  return (
    <LinkedInModal
      ref={linkedRef}
      clientID="789w58w9etnssh"
      clientSecret="hSlAJZVgWr5QCfR2"
      redirectUri="https://www.linkedin.com/developers/apps/56468744"
      onSuccess={login}
      onError={(err) => alert(err)}
      renderButton={() => (
        <Icons icon="LinkedIn" onPress={() => linkedRef.current?.open()} />
      )}
    />
  );
};

export default LinkedIn;
