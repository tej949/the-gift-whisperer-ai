
import React from "react";
import { Gift } from "lucide-react";

const Header = () => {
  return (
    <header className="py-6 mb-8">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-gift-600 to-gift-400 p-2 rounded-lg">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Gift Whisperer</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
