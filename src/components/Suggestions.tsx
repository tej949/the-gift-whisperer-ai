
import { Button } from "@/components/ui/button";
import { GiftSuggestion } from "@/services/geminiService";
import GiftCard from "./GiftCard";
import { RefreshCcw } from "lucide-react";

interface SuggestionsProps {
  suggestions: GiftSuggestion[];
  onRegenerateSuggestions: () => void;
  isLoading: boolean;
}

const Suggestions = ({ suggestions, onRegenerateSuggestions, isLoading }: SuggestionsProps) => {
  if (!suggestions.length) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">Gift Suggestions</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRegenerateSuggestions}
          disabled={isLoading}
          className="text-gift-700 border-gift-200 hover:bg-gift-50"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((gift, index) => (
          <GiftCard key={index} gift={gift} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
