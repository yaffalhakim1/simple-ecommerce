import { create } from "zustand";
import axios from "axios";
import { BASE_URL } from "@/lib/shared";

type User = {
  id: any;
  name: string;
  email: string;
  password: string;
};

type UserStore = {
  user: User | null;
  signin: (username: string, password: string) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  signin: async (username, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const user = response.data;
        set({ user });

        // Save user credentials in localStorage
        localStorage.setItem("token", user.token);
        localStorage.setItem("name", user.name);
        // console.log(localStorage.getItem("token"));
        console.table("Sign-in successful:", user);
      } else {
        // Handle sign-in error, e.g., show an error message
        console.error({ response });
      }
    } catch (error) {
      // Handle sign-in error, e.g., show an error message
      console.error("Sign-in failed:", error);
    }
  },
}));
