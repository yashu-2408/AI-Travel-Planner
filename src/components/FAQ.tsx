import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI create personalized itineraries?",
      answer: "Our AI analyzes your preferences, budget, and travel dates along with real-time data about destinations, weather, events, and local attractions to create a custom itinerary that perfectly matches your interests."
    },
    {
      question: "Can I modify the generated itinerary?",
      answer: "Yes! All itineraries are fully customizable. You can add, remove, or rearrange activities to create your perfect trip schedule."
    },
    {
      question: "How far in advance should I plan my trip?",
      answer: "While our AI can generate itineraries for immediate travel, we recommend planning at least 2-4 weeks ahead to take advantage of better pricing and availability for accommodations and activities."
    },
    {
      question: "Are the recommendations up-to-date?",
      answer: "Yes, our AI constantly updates its recommendations based on real-time data, including opening hours, weather conditions, local events, and user reviews."
    },
    {
      question: "What happens if I need to change my travel dates?",
      answer: "You can easily adjust your travel dates, and our AI will automatically update your itinerary, taking into account seasonal activities, weather changes, and event schedules."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}