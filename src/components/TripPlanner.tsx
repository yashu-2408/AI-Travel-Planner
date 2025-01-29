import React, { useState } from 'react';
import { Calendar, DollarSign, Heart, Map } from 'lucide-react';
import { generateItinerary } from '../lib/gemini';
import { supabase } from '../lib/supabase';

export default function TripPlanner() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'Mid-Range',
    interests: [] as string[],
  });
  const [itinerary, setItinerary] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleGenerateItinerary = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateItinerary(formData);
      setItinerary(result);

      // Save trip to Supabase if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('trips').insert([
          {
            user_id: user.id,
            destination: formData.destination,
            start_date: formData.startDate,
            end_date: formData.endDate,
            budget: formData.budget,
            interests: formData.interests,
            itinerary: result,
          },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary');
      console.error('Error generating itinerary:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="planner" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Plan Your Perfect Trip</h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Where would you like to go?</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter city or country"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <div className="mt-1 relative">
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <div className="mt-1 relative">
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Next: Preferences
                </button>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Tell us your preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Budget Range</label>
                    <div className="mt-1 relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option>Budget Friendly</option>
                        <option>Mid-Range</option>
                        <option>Luxury</option>
                      </select>
                      <DollarSign className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Interests</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {['Culture', 'Nature', 'Food', 'Adventure', 'Shopping', 'Relaxation'].map((interest) => (
                        <label key={interest} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleInterestChange(interest)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/2 bg-gray-200 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setStep(3);
                      handleGenerateItinerary();
                    }}
                    className="w-1/2 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors"
                  >
                    Generate Itinerary
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Your Custom Itinerary</h3>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Heart className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">AI is generating your perfect itinerary...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-8">
                      <p className="text-red-600">{error}</p>
                      <button
                        onClick={handleGenerateItinerary}
                        className="mt-4 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : itinerary ? (
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">
                        {JSON.stringify(itinerary, null, 2)}
                      </pre>
                    </div>
                  ) : null}
                </div>
                
                <button
                  onClick={() => {
                    setStep(1);
                    setItinerary(null);
                    setFormData({
                      destination: '',
                      startDate: '',
                      endDate: '',
                      budget: 'Mid-Range',
                      interests: [],
                    });
                  }}
                  className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Plan Another Trip
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}