"use client"
import React, { useState } from 'react';
import { Monitor, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SignUpProps {
  onSwitchToSignIn: () => void;
  onBack: () => void;
}

 const SignUp: React.FC<SignUpProps> = ({ onSwitchToSignIn, onBack }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up:', formData);

    let respone = await axios.post(`${BACKEND_URL}/user/signup`, {
      username: formData.username,
      password: formData.password
    })
      localStorage.setItem("token", respone.data.token)
     router.push("/signin")

  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Text Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-blue-700 p-12 flex-col justify-center">
        <button
          onClick={()=> {
            router.push("/")
          }}
          className="flex items-center space-x-2 text-white/80 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </button>
        
        <div className="max-w-md">
          <div className="flex items-center space-x-3 mb-8">
            <Monitor className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold text-white">UptimeGuard</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Start monitoring your websites today
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of businesses who trust UptimeGuard to keep their websites running smoothly.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90">14-day free trial</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90">No credit card required</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white/90">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </button>
            <div className="flex items-center space-x-2 mb-4">
              <Monitor className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">UptimeGuard</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
            <p className="text-gray-400">Start your free 14-day trial</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>

     

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                required
              />
              <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.agreeToTerms}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Create account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;