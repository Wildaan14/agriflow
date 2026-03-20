"use client";

import { UserButton } from "@clerk/nextjs";

export function PremiumUserButton() {
  return (
    <div className="flex items-center gap-4">
      <UserButton 
        appearance={{
          elements: {
            userButtonAvatarBox: "h-10 w-10 border-2 border-primary/20 hover:border-primary/50 transition-all",
            userButtonTrigger: "focus:shadow-none focus:outline-none"
          }
        }}
      />
    </div>
  );
}
