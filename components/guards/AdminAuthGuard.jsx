"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { setToken } from "@/services/axios";

export default function AdminAuthGuard({ children }) {
  const { replace } = useRouter();
  const { status, data } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isSuperUser =
    data?.user.role === "ADMIN" || data?.user.role === "OWNER";

  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (isAuthenticated && isSuperUser) {
      setToken(data.user.access);
      setIsTokenSet(true);
    }
  }, [isAuthenticated, isSuperUser, data?.user.access]);

  if (isLoading) return null;

  if (isAuthenticated && isSuperUser) {
    if (!isTokenSet) return null;
    return children;
  } else {
    replace("/auth/login");
  }
}
