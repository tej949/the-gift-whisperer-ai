
// This service generates placeholder images for our gift suggestions
// In a production app, you'd likely use a real image generation API

export const generateImageUrl = (prompt: string): string => {
  // We'll use a placeholder image service with the gift name as a seed
  // This ensures we get the same image for the same prompt (deterministic)
  
  // Create a simple hash from the prompt string
  const hash = prompt.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Use the hash to generate a unique but consistent color
  const hue = hash % 360;
  const saturation = 60 + (hash % 30);
  const lightness = 50 + (hash % 20);
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
  const encodedPrompt = encodeURIComponent(prompt.substring(0, 50));
  
  // Use a placeholder image service with the prompt as text and our generated color
  return `https://placehold.co/400x300/${color.replace('#', '')}?text=${encodedPrompt}`;
};
