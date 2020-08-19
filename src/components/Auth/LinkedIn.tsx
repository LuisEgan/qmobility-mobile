import React, { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import LinkedInModal, { LinkedInToken } from "react-native-linkedin";
import Icons from "../svg";
import {
  ISocialNetworkLogin,
  ISocialNetworkLoginVars,
} from "../../gql/User/mutations";
import { User } from "../../gql";

const LinkedIn = () => {
  const linkedRef = useRef<LinkedInModal>(null);

  const [linkedInLogin, { data: linkedInData }] = useMutation<
    { linkedInLogin: ISocialNetworkLogin },
    ISocialNetworkLoginVars
  >(User.mutations.loginWithLinkedIn);

  useEffect(() => {
    if (linkedInData) {
      console.log("linkedInData: ", linkedInData);
    }
  }, [linkedInData]);

  const login = (token: LinkedInToken) => {
    linkedInLogin({
      variables: {
        accessToken: token,
      },
    });
  };

  return (
    <LinkedInModal
      ref={linkedRef}
      clientID="78rt6ffawe2601"
      clientSecret="ESxDZ5byttU4yv86"
      redirectUri="https://www.linkedin.com/developers/apps/55928244"
      onSuccess={login}
      onError={(err) => alert(err)}
      renderButton={() => {
        return (
          <Icons icon="LinkedIn" onPress={() => linkedRef.current?.open()} />
        );
      }}
    />
  );
};

export default LinkedIn;
