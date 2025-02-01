import axios from "axios";
import { create } from "zustand";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAuthStore = create((set) => ({
  username: "",
  password: "",
  email: "",
  error: "",
  isAuthenticated: false,

  signup: async (username, email, password) => {
    try {
      await api.post("/signup", { username, email, password });
      set({
        isAuthenticated: true,
        username: "",
        email: "",
        password: "",
        error: "",
      });
    } catch (error) {
      console.error("Failed to signup user", error);
      set({ error: "Failed to signup user" });
    }
  },

  login: async (username, password) => {
    try {
      await api.post("/login", { username, password });
      set({ isAuthenticated: true, username: "", password: "", error: "" });
    } catch (error) {
      console.error("Login error:", error);
      set({ error: "Wrong username or password." });
    }
  },

  logout: async () => {
    try {
      await api.post("/logout");
      set({
        isAuthenticated: false,
        username: "",
        email: "",
        password: "",
        error: "",
      });
    } catch (error) {
      console.error("Logout error:", error);
      set({ error: "Failed to logout user" });
    }
  },
}));

export default useAuthStore;
