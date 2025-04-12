
import React, { useState } from "react";
import Header from "@/components/Header";
import GiftForm from "@/components/GiftForm";
import Suggestions from "@/components/Suggestions";
import { GiftSuggestion, GiftSuggestionRequest, generateGiftSuggestions } from "@/services/geminiService";
import { toast } from "sonner";

const Index = () => {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequest, setLastRequest] = useState<GiftSuggestionRequest | null>(null);

  const handleSubmit = async (formData: GiftSuggestionRequest) => {
    setIsLoading(true);
    setLastRequest(formData);
    
    try {
      const result = await generateGiftSuggestions(formData);
      setSuggestions(result);
      toast.success("Gift suggestions generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (lastRequest) {
      setIsLoading(true);
      
      try {
        const result = await generateGiftSuggestions(lastRequest);
        setSuggestions(result);
        toast.success("New gift suggestions generated!");
      } catch (error) {
        console.error("Error regenerating suggestions:", error);
        toast.error("Failed to regenerate suggestions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gift-50/30 dark:from-background dark:to-gift-950/10">
      <Header />
      
      <main className="container px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Find the <span className="gradient-text">Perfect Gift</span> for Any Occasion
            </h2>
            <p className="text-muted-foreground">
              Tell us about the recipient and we'll suggest personalized gift ideas using AI.
            </p>
          </div>
          
          <GiftForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          <Suggestions 
            suggestions={suggestions} 
            onRegenerateSuggestions={handleRegenerate} 
            isLoading={isLoading} 
          />
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container px-4">
          <p className="text-center text-sm text-muted-foreground">
            Gift Whisperer AI © {new Date().getFullYear()} • Powered by Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
