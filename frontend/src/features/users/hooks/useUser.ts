import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { User, getAuth } from "firebase/auth";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
        setUserLoading(false);
      } else {
        setUserLoading(false);
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return {
    user: user,
    isAdmin: isAdmin,
    setUser: setUser,
    userLoading: userLoading,
  };
};
