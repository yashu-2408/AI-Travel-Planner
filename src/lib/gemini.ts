import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateItinerary(tripData: {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  interests: string[];
}) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Create a travel itinerary for ${tripData.destination} from ${tripData.startDate} to ${tripData.endDate}.
Budget level: ${tripData.budget}
Interests: ${tripData.interests.join(', ')}

Please provide a structured itinerary in the following JSON format:
{
  "summary": "Brief overview of the trip",
  "days": [
    {
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "time": "HH:MM",
          "description": "Activity description",
          "location": "Place name",
          "cost": "Estimated cost",
          "type": "Activity type (e.g., Sightseeing, Food, etc.)"
        }
      ]
    }
  ],
  "totalCost": "Estimated total cost",
  "tips": ["Array of useful tips"],
  "recommendations": {
    "restaurants": ["List of recommended restaurants"],
    "attractions": ["Must-visit attractions"],
    "transportation": ["Transportation tips"]
  }
}

Ensure the response is ONLY the JSON object, with no additional text or formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to find JSON content within the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const jsonStr = jsonMatch[0];
    const parsedData = JSON.parse(jsonStr);

    // Validate the structure
    if (!parsedData.days || !Array.isArray(parsedData.days)) {
      throw new Error('Invalid itinerary format');
    }

    return parsedData;
  } catch (error) {
    console.error('Failed to parse Gemini response:', error);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
}