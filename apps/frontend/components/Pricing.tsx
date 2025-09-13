import React from 'react';
import { Check, Star } from 'lucide-react';


export const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$1',
      period: 'per month',
      description: 'Perfect for small websites and personal projects',
      features: [
        'Monitor up to 5 websites',
        '5-minute check intervals',
        'Email alerts',
        'Basic status page',
        '30-day data retention',
        'Community support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      description: 'Ideal for growing businesses and teams',
      features: [
        'Monitor up to 25 websites',
        '1-minute check intervals',
        'SMS + Email + Slack alerts',
        'Custom branded status pages',
        '1-year data retention',
        'Priority support',
        'Team collaboration',
        'SSL certificate monitoring'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$10',
      period: 'per month',
      description: 'For large organizations with complex needs',
      features: [
        'Monitor up to 100 websites',
        '30-second check intervals',
        'All alert channels',
        'White-label status pages',
        'Unlimited data retention',
        '24/7 phone support',
        'Advanced analytics',
        'API access',
        'SLA monitoring',
        'Custom integrations'
      ],
      popular: false
    } 
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your monitoring needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-200 hover:scale-105 ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Need something custom? We can build a plan that fits your specific requirements.
          </p>
          <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Contact Sales →
          </button>
        </div>
      </div>
    </section>
  );
};