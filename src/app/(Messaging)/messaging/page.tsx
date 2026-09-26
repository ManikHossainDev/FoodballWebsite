
import React from "react";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Messages - Evolution Hub",
  description:
    "Chat and connect with players, coaches, clubs, and agents on Evolution Hub.",
};

const page = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-900/40 flex items-center justify-center mb-4 text-red-500">
        <MessageSquare className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
      <p className="text-gray-400 text-sm max-w-sm">
        Select a conversation from the list to start chatting with players, coaches, or agents.
      </p>
    </div>
  );
};

export default page;