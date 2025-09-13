import React from 'react';
import { Globe, Smartphone, BarChart3, Shield, Clock, Users } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Globe,
      title: 'Global Monitoring',
      description: 'Monitor from 15+ locations worldwide to ensure your site is accessible everywhere.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Alerts',
      description: 'Get instant SMS, email, and push notifications when your site goes down.'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Detailed reports on response times, uptime percentages, and performance trends.'
    },
    {
      icon: Shield,
      title: 'SSL Monitoring',
      description: 'Track SSL certificate expiration and get alerts before certificates expire.'
    },
    {
      icon: Clock,
      title: 'Custom Check Intervals',
      description: 'Monitor as frequently as every 30 seconds with customizable check intervals.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share monitoring dashboards and collaborate with your team on incidents.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Monitoring Features
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to keep your website running smoothly and your users happy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105"
            >
              <feature.icon className="h-12 w-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-gray-700">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Advanced Status Pages
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Create beautiful, branded status pages to keep your customers informed during incidents. 
              Customize colors, add your logo, and provide real-time updates.
            </p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Status Page Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};