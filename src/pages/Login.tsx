
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login (in a real app, this would be an API call)
      if (credentials.username === 'admin' && credentials.password === 'password') {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${credentials.username}!`,
          variant: "default",
        });
        
        navigate('/admin-dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Admin Header */}
            <div className="bg-school-primary py-4 text-center">
              <h2 className="text-xl font-semibold text-white">Admin Portal</h2>
            </div>
            
            {/* Login Form */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-center text-school-primary mb-6">
                Administrator Login
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-school-primary"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-school-primary"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-school-primary border-gray-300 rounded focus:ring-school-primary"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="text-school-secondary hover:text-school-primary">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
              
              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-school-accent rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Demo Credentials:</strong> Use username "admin" and password "password" to test the login functionality.
                </p>
              </div>
            </div>
          </div>
          
          {/* Help Box */}
          <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-school-primary mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you're having trouble accessing your account, please contact our IT support team.
            </p>
            <div className="text-gray-600">
              <p>Email: support@campusgateway.edu</p>
              <p>Phone: +1 (555) 987-6543</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
