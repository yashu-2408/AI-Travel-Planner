import React from 'react';
import { MapPin, Calendar, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your AI Travel Companion</span>
            <span className="block text-blue-600">Perfect Itineraries in Minutes</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience personalized travel planning powered by AI. Get custom itineraries tailored to your preferences, complete with local insights and real-time updates.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#planner" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Plan Your Trip
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <MapPin className="h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-semibold">Smart Destinations</h3>
            <p className="mt-2 text-gray-600 text-center">AI-powered recommendations based on your interests</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <Calendar className="h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-semibold">Perfect Timing</h3>
            <p className="mt-2 text-gray-600 text-center">Optimized schedules with real-time updates</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <Sparkles className="h-12 w-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-semibold">Local Insights</h3>
            <p className="mt-2 text-gray-600 text-center">Hidden gems and authentic experiences</p>
          </div>
        </div>
      </div>
    </div>
  );
}