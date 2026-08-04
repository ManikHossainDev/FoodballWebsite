/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import ChatCard from "./ChatCard";
import { useRouter } from "next/navigation";

export interface IChatUser {
  _id: string;
  name: string;
  image?: string;
}

export interface ILastMessage {
  _id: string;
  author: IChatUser;
  text: string;
  image?: string | null;
  type: string;
  createdAt: string;
}

export interface IChat {
  _id: string;
  users: IChatUser[];
  type: "private" | "group" | string;
  lastMessage?: ILastMessage;
  createdAt?: string;
  updatedAt?: string;
  unseenMsg?: number;
}

interface IConversationListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IChat[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

const Chats = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversations, setConversations] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);

  const router = useRouter();

  const { socket, connected } = useSocket();
  const user = useSelector(selectCurrentUser);
  const currentUserId = (user as any)?._id;

  useEffect(() => {
    if (!connected || !socket || !currentUserId) return;
    socket.emit("Conversations", {
      page: 1,
      limit: 10,
    });

    const handleConversationsList = (response: IConversationListResponse) => {
      try {
        const list = response?.data?.data ?? [];
        setConversations(list);
        setLoading(false);
      } catch (err) {
        console.error("Error handling conversation list:", err);
        setError("Failed to load conversations");
        setLoading(false);
      }
    };

    const handleSingleConversationUpdate = (payload: IChat | { data: IChat }) => {
      const data: IChat = (payload as any)?.data ?? (payload as IChat);
      if (!data?._id) return;

      setConversations((prev) => {
        const exists = prev.some((c) => c._id === data._id);
        if (exists) {
          return prev.map((c) => (c._id === data._id ? data : c));
        }
        return [data, ...prev];
      });
    };

    const handleConversationError = (err: { message: string } | unknown) => {
      console.error("Conversation error:", err);
      setError("Failed to load conversations");
      setLoading(false);
    };

    const handleOnlineUsers = (payload: any) => {
      const list: (string | number)[] =
        payload?.data ?? payload?.users ?? (Array.isArray(payload) ? payload : []);
      setOnlineUserIds(list.map((id) => String(id)));
    };

    socket.on("Conversations", handleConversationsList);
    socket.on("Conversation", handleSingleConversationUpdate);
    socket.on("UpdateConversation", handleSingleConversationUpdate);
    socket.on("error", handleConversationError);
    socket.on("OnlineUsers", handleOnlineUsers);

    const loadingTimeout = setTimeout(() => {
      setLoading((prevLoading) => {
        if (prevLoading) {
          setError("Timeout loading conversations");
        }
        return false;
      });
    }, 10000);

    return () => {
      socket.off("Conversations", handleConversationsList);
      socket.off("Conversation", handleSingleConversationUpdate);
      socket.off("UpdateConversation", handleSingleConversationUpdate);
      socket.off("error", handleConversationError);
      socket.off("OnlineUsers", handleOnlineUsers);
      clearTimeout(loadingTimeout);
    };
  }, [connected, socket, currentUserId]);

  useEffect(() => {
    const observer = observerRef.current;
    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // ✅ receiverId param navigate করলেই Layout.tsx এ Chats hide হয়ে Message দেখাবে (mobile এ)
  const handleChatSelect = (chat: IChat) => {
    const otherUser = chat?.users?.[0];
    if (otherUser?._id) {
      router.push(`/messaging/${otherUser._id}`);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Searching for:", e.target.value);
  };

  if (loading) {
    return (
      <section className="w-full h-full flex flex-col ">
        <div className="p-3">
          <input
            type="text"
            name="search"
            className="w-full py-3 px-4 bg-black text-white placeholder-gray-500 border border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            placeholder="Search conversations..."
            onChange={handleSearch}
          />
        </div>
        <div className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
            <p className="text-gray-400">Loading conversations...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-full flex flex-col ">
        <div className="p-3">
          <input
            type="text"
            name="search"
            className="w-full py-3 px-4 bg-black text-white placeholder-gray-500 border border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            placeholder="Search conversations..."
            onChange={handleSearch}
          />
        </div>
        <div className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center p-4">
            <div className="bg-neutral-900 border border-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-white mb-1">Error loading conversations</p>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-full flex flex-col ">
      <div className="p-3">
        <input
          type="text"
          name="search"
          className="w-full py-3 bg-black text-white placeholder-gray-500 px-4 border border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          placeholder="Search conversations..."
          onChange={handleSearch}
        />
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        <div
          ref={chatContainerRef}
          className="w-full h-full flex flex-col gap-2 scrollbar-hide overflow-y-auto p-2 md:p-4"
        >
          {conversations && conversations?.length > 0 ? (
            conversations?.map((chat) => {
              const otherUser = chat?.users?.[0];
              const isOnline = otherUser?._id
                ? onlineUserIds.includes(String(otherUser._id))
                : false;

              return (
                <ChatCard
                  key={chat?._id ?? Math.random().toString()}
                  chat={chat}
                  currentUserId={currentUserId || ""}
                  isOnline={isOnline}
                  onClick={() => handleChatSelect(chat)}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="bg-neutral-900 border-2 border-dashed border-gray-700 rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-white">No conversations yet</p>
              <p className="text-sm text-center mt-1 text-gray-400">
                Start a conversation by messaging someone
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chats;