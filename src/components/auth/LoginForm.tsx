
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful! Welcome back.");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-medify-blue">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue to Medify</p>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="health-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="health-input"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link to="/forgot-password" className="text-medify-blue hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 btn-primary"
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </div>

        <div className="text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-medify-blue hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
