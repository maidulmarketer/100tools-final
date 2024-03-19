"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { registerGoogleUser } from "@/services/authService";
import { setIdentity } from "@/services/axios";

export default function UserAuthSetter({ children }) {
  const { status, data, update } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (isAuthenticated && data?.user?.id) {
      setIdentity(data.user.id);

      const storableGoogleUser = {
        ...data.user,
        iid: data.user.id,
        f_name: data.user.name,
        e_mail: data.user.email,
      };

      delete storableGoogleUser.id;
      delete storableGoogleUser.email;

      registerGoogleUser(storableGoogleUser)
        .then((res) => console.log("Stored google user to the DB"))
        .catch((err) => console.log("Unable to store google user"));
    }
  }, [isAuthenticated, data?.user]);

  if (isLoading) return null;

  return children;
}
