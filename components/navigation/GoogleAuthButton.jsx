"use client";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import Button from "../buttons/Button";
import UserMenu from "./UserMenu";
import googleLogo from "@/public/images/google.png";

export default function GoogleAuthButton() {
  const { data, status } = useSession();

  const isAuthenticated = status === "authenticated";

  return (
    <div className="hidden md:block">
      {isAuthenticated ? (
        <UserMenu user={data.user} />
      ) : (
        <Button
          onClick={() => signIn("google")}
          variant="secondary"
          className="flex border-transparent w-[75px]"
        >
          <Image src={googleLogo} alt="google-logo" className="w-4" />
          Login
        </Button>
      )}
    </div>
  );
}
