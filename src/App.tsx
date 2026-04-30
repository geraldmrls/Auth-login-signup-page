function App() {

  // two screens: "auth" or "home"
  const screen = "auth"

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      {/* ===== AUTH SCREEN ===== */}
      {screen === "auth" && (
        <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-sm">

          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome</h1>
          <p className="text-sm text-gray-400 mb-6">Sign in or create an account</p>

          {/* Email input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Error message */}
          <p className="text-red-400 text-sm mb-3">error message here</p>

          {/* Success message */}
          <p className="text-green-500 text-sm mb-3">success message here</p>

          {/* Login button */}
          <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer transition-colors mb-3">
            Sign In
          </button>

          {/* Sign up button */}
          <button className="w-full py-3 bg-white hover:bg-gray-50 text-blue-500 border border-blue-500 rounded-xl text-sm font-semibold cursor-pointer transition-colors">
            Create Account
          </button>

        </div>
      )}

      {/* ===== HOME SCREEN (after login) ===== */}
      {screen === "home" && (
        <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-sm text-center">

          <h1 className="text-2xl font-bold text-gray-800 mb-2">You are logged in!</h1>
          <p className="text-gray-400 text-sm mb-8">Welcome back, user@email.com</p>

          {/* Logout button */}
          <button className="w-full py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl text-sm font-semibold cursor-pointer transition-colors">
            Log Out
          </button>

        </div>
      )}

    </div>
  )
}

export default App