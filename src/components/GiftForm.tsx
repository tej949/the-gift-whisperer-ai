
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GiftSuggestionRequest } from "@/services/geminiService";
import { Gift, Loader2 } from "lucide-react";

interface GiftFormProps {
  onSubmit: (formData: GiftSuggestionRequest) => void;
  isLoading: boolean;
}

const GiftForm: React.FC<GiftFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<GiftSuggestionRequest>({
    age: "",
    gender: "",
    relation: "",
    occasion: "",
    interests: "",
    budget: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-card space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Gift className="text-gift-500" size={24} />
        <h2 className="text-2xl font-bold gradient-text">Gift Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            placeholder="e.g. 25, teenager, senior"
            value={formData.age}
            onChange={handleChange}
            className="input-shadow"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            name="gender"
            value={formData.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
            required
          >
            <SelectTrigger className="input-shadow">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="not-specified">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="relation">Relation</Label>
          <Select
            name="relation"
            value={formData.relation}
            onValueChange={(value) => handleSelectChange("relation", value)}
            required
          >
            <SelectTrigger className="input-shadow">
              <SelectValue placeholder="Select relation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="romantic-partner">Romantic Partner</SelectItem>
              <SelectItem value="colleague">Colleague</SelectItem>
              <SelectItem value="acquaintance">Acquaintance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occasion">Occasion</Label>
          <Select
            name="occasion"
            value={formData.occasion}
            onValueChange={(value) => handleSelectChange("occasion", value)}
            required
          >
            <SelectTrigger className="input-shadow">
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="anniversary">Anniversary</SelectItem>
              <SelectItem value="christmas">Christmas</SelectItem>
              <SelectItem value="graduation">Graduation</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="just-because">Just Because</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget</Label>
          <Input
            id="budget"
            name="budget"
            placeholder="e.g. $50, under $100, $20-$50"
            value={formData.budget}
            onChange={handleChange}
            className="input-shadow"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="interests">Interests/Hobbies</Label>
          <Textarea
            id="interests"
            name="interests"
            placeholder="e.g. reading, hiking, cooking, gaming"
            value={formData.interests}
            onChange={handleChange}
            className="input-shadow resize-none min-h-[100px]"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-4 bg-gradient-to-r from-gift-600 to-gift-500 hover:from-gift-700 hover:to-gift-600 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Suggestions...
          </>
        ) : (
          <>Find Perfect Gifts</>
        )}
      </Button>
    </form>
  );
};

export default GiftForm;
