
import { toast } from "sonner";

const API_KEY = "AIzaSyDO0R-9FhBajxi-TznQ95INqHjzKXEZ50w";
// Updated API URL to use the correct Gemini API version and model
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface GiftSuggestionRequest {
  age: string;
  gender: string;
  relation: string;
  occasion: string;
  interests: string;
  budget: string;
}

export interface GiftSuggestion {
  name: string;
  description: string;
  price: string;
  reason: string;
  imagePrompt: string;
}

const generatePrompt = (request: GiftSuggestionRequest): string => {
  return `Act as a gift suggestion expert. Based on the following details:
  
Age: ${request.age}
Gender: ${request.gender}
Relationship to gift giver: ${request.relation}
Occasion: ${request.occasion}
Interests/Hobbies: ${request.interests}
Budget: ${request.budget}

Suggest 3 gift ideas. For each gift idea, provide:
1. Gift name
2. Brief description
3. Estimated price range
4. Why it's appropriate
5. A short image prompt that could be used to generate an image of this gift (this is just for AI image generation)

Format your response as a JSON array with objects having the following structure:
[
  {
    "name": "Gift name",
    "description": "Brief description",
    "price": "Price range",
    "reason": "Why it's appropriate",
    "imagePrompt": "Image generation prompt"
  }
]

Return ONLY the JSON array with no other text or explanation.`;
};

export const generateGiftSuggestions = async (
  request: GiftSuggestionRequest
): Promise<GiftSuggestion[]> => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: generatePrompt(request),
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to generate gift suggestions");
    }

    const data = await response.json();
    
    // Extract the text from the response
    const text = data.candidates[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error("No suggestions received");
    }

    // Find the JSON part in the response text - the API might return markdown or extra text
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error("Could not parse gift suggestions");
    }

    // Parse the JSON
    const suggestions = JSON.parse(jsonMatch[0]);
    return suggestions;
  } catch (error) {
    console.error("Error generating gift suggestions:", error);
    toast.error("Failed to generate gift suggestions. Please try again.");
    throw error;
  }
};
