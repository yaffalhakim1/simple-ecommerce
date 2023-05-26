import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export const useTokenCheck = () => {
  const router = useRouter();
  const token = Cookie.get("token");
  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
};
