import { useState, useEffect } from "react";
import { supabase } from "./supabase.ts";

function App() {
  const [screen, setScreen] = useState<string>("auth");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setScreen("home");
      setLoading(false);
    };
    checkSession(); // check session on page load

    // listen for auth changes (login, logout, token, refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setScreen("home");
      } else {
        setScreen("auth");
      }
    });

    return ()=>{
      return subscription.unsubscribe(); 
    }
  }, []);

  // handle login
  async function handleLogin() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setScreen("home");
    }
    setLoading(false);
  }

  // handle sign up
  async function handleSignup() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setMessage("check your email to confirm your account");
    }
    setLoading(false);
  }

  // handle logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setScreen("auth");
    setEmail("");
    setPassword("");
  }

  // two screens: "auth" or "home"

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* ===== AUTH SCREEN ===== */}
      {screen === "auth" && (
        <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome</h1>
          <p className="text-sm text-gray-400 mb-6">
            Sign in or create an account
          </p>

          {/* Email input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Error message */}
          <p className="text-red-400 text-sm mb-3">{error}</p>

          {/* Success message */}
          <p className="text-green-500 text-sm mb-3">{message}</p>

          {/* Login button */}
          <button
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer transition-colors mb-3"
            onClick={handleLogin}
          >
            Sign In
          </button>

          {/* Sign up button */}
          <button
            className="w-full py-3 bg-white hover:bg-gray-50 text-blue-500 border border-blue-500 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
            onClick={handleSignup}
          >
            Create Account
          </button>
        </div>
      )}

      {/* ===== HOME SCREEN (after login) ===== */}
      {screen === "home" && (
        <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            You are logged in!
          </h1>
          <p className="text-gray-400 text-sm mb-8">Welcome back, {email}</p>

          {/* Logout button */}
          <button
            className="w-full py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl text-sm font-semibold cursor-pointer transition-colors"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
