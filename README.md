GiftWhisperer leverages the power of Google Gemini AI to deliver lightning-fast, personalized gift suggestions. With a sleek, responsive UI and seamless performance, it’s built to impress—on any screen.

✨ Features
🧠 Intelligent Recommendations: AI-driven suggestions based on age, occasion, interests, budget, and relationship
🎨 Modern UI/UX: Beautifully designed dashboard with smooth, animated transitions
⚡ Real-Time Results: Receive 3 curated gift ideas in under 2 seconds
📱 Fully Responsive: Optimized for mobile, tablet, and desktop devices

🛠 Tech Stack
Frontend: React + Vite + TypeScript
UI Library: shadcn/ui + Tailwind CSS
AI Integration: Google Gemini API
Hosting: Lovable (custom domain support included)

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/yourusername/giftgenius.git
cd GiftWhisperer

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a .env file in the root directory:
VITE_GEMINI_API_KEY=your_api_key_here

5. Run Locally
npm run dev

🔄 How It Works
sequenceDiagram
    User->>Frontend: Inputs age, occasion, interests, etc.
    Frontend->>Gemini API: Sends structured prompt
    Gemini API->>Frontend: Returns gift recommendations (JSON)
    Frontend->>User: Displays animated gift cards
    
🧩 Key Components
🎯 Prompt Engineering
const generatePrompt = (inputs: GiftInputs) => `
Act as an expert gift advisor. Suggest 3 gifts matching:
- Age: ${inputs.age}
- Occasion: ${inputs.occasion}
- Interests: ${inputs.interests.join(', ')}
- Budget: $${inputs.budget}
- Relationship: ${inputs.relation}

Output JSON:
{
  "gifts": [
    {
      "name": "...",
      "price": "...",
      "reason": "...",
      "purchase_link": "..."
    }
  ]
}
`;
🖼 UI Snapshots
Dashboard
![Screenshot (230)](https://github.com/user-attachments/assets/8e5a0dcd-9153-440f-b3d3-c6ee89ec6844)

Gift Results
![Screenshot (231)](https://github.com/user-attachments/assets/d05ede92-d24b-49a0-bb4d-b00c066e64fe)

📦 Deployment
Push updates to the main branch
In the Lovable dashboard:
Navigate to Share → Publish
Connect a custom domain (optional)

🎨 Customization
Want to tweak the look or logic?
Colors & Themes: src/styles/globals.css
Layout Components: src/components/ui/
AI Prompt Logic: src/lib/gemini.ts

📄 License
MIT License © 2024 VALLEM TEJOMAI
