
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GiftSuggestion } from "@/services/geminiService";
import { generateImageUrl } from "@/services/imageService";
import { Badge } from "@/components/ui/badge";
import { Gift, Heart } from "lucide-react";

interface GiftCardProps {
  gift: GiftSuggestion;
  index: number;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, index }) => {
  // Generate a consistent image for the gift
  const imageUrl = generateImageUrl(gift.imagePrompt);
  
  // Add a small delay to each card for a staggered animation effect
  const animationDelay = `${index * 150}ms`;

  return (
    <Card className="gift-card overflow-hidden animate-fade-in" style={{ animationDelay }}>
      <div className="absolute right-4 top-4 z-10">
        <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-gift-200 text-gift-700 font-medium">
          {gift.price}
        </Badge>
      </div>
      
      <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
        <img 
          src={imageUrl} 
          alt={gift.name} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardContent className="p-0 space-y-4">
        <div>
          <h3 className="text-xl font-semibold gradient-text">{gift.name}</h3>
          <p className="text-muted-foreground mt-1">{gift.description}</p>
        </div>
        
        <div className="rounded-lg border border-border bg-secondary/50 p-3">
          <div className="flex items-center gap-2 mb-1 text-sm font-medium text-gift-700">
            <Heart size={14} className="fill-gift-200 stroke-gift-700" />
            <span>Why it's perfect</span>
          </div>
          <p className="text-sm">{gift.reason}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftCard;
