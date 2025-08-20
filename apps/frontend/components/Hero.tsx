"use client"
import React from 'react';
import { Monitor, Menu, X } from 'lucide-react';

import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';


export const Hero: React.FC = () => {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const router = useRouter()

  return (
    
    <section className="pt-20 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Monitor className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">UptimeGuard</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>

            <button 
            onClick={()=> {
                router.push("/signup")
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Start Free Trial
            </button>

                <button 
            onClick={()=> {
                router.push("/signin")
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Signin
            </button>
          </nav>

          <button 
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-left">
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Monitor Your Website
            <span className="bg-gradient-to-r text-5xl from-blue-400 to-purple-600 bg-clip-text text-transparent block mt-2">
              24/7 Uptime Tracking
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant alerts when your website goes down. Monitor performance, track uptime, and keep your business running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 transition-all duration-200 hover:scale-105">
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              View Demo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">99.9% Uptime</h3>
            <p className="text-gray-400">Industry-leading reliability for your monitoring needs.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Instant Alerts</h3>
            <p className="text-gray-400">Get notified within seconds when issues arise.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-sm">24</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">24/7 Monitoring</h3>
            <p className="text-gray-400">Round-the-clock surveillance from global locations.</p>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to get started?</h3>
              <p className="text-gray-400">Join thousands of businesses protecting their online presence.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-700 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-64"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};