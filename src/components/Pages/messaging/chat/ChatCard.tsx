import Avatars from "../Avatars";
import { IChat, IChatUser } from "./chats";

interface ChatCardProps {
  chat: IChat;
  // ✅ FIX: age eikhane `chat?.users?.[0]` diye blindly otherUser dhora hoto,
  // jate currentUserId nijer array-e first thakle nijer image/name dekhato.
  // Ekhon Chats.tsx theke already-correct otherUser (currentUserId bad diye ber kora)
  // prop hisebe pathano hocche, tai eikhane আর kono guess korte hobe na.
  otherUser?: IChatUser;
  currentUserId: string;
  isOnline?: boolean;
  onClick: () => void;
}

const ChatCard = ({ chat, otherUser, currentUserId, isOnline = false, onClick }: ChatCardProps) => {
  const formatTime = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      if (diffInDays === 0) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffInDays === 1) {
        return 'Yesterday';
      } else if (diffInDays < 7) {
        return date.toLocaleDateString([], { weekday: 'short' });
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  // Truncate long messages with error handling
  const truncateMessage = (text: string | undefined, maxLength: number = 30) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Handle potential undefined values
  const fullName = otherUser?.name || 'Unknown User';
  // ✅ Backend theke asha "image" already full Cloudinary URL, backend URL prefix lagbe na
  const profileImage = otherUser?.image || '';
  const userId = otherUser?._id ?? '';

  // ✅ Last message image hole text na thakleo "Photo" dekhabe
  const lastMessage = chat?.lastMessage;
  const isImageMessage = !!lastMessage?.image && !lastMessage?.text;
  const lastMsgText = isImageMessage ? '📷 Photo' : (lastMessage?.text ?? '');
  const lastMsgTime = lastMessage?.createdAt;
  const unseenMsgCount = chat?.unseenMsg ?? 0;

  // ✅ currentUserId use kore bujhbo message ta "amar" naki "onnojoner"
  const isOwnMessage = !!lastMessage?.author?._id && lastMessage.author._id === currentUserId;
  const messagePrefix = isOwnMessage ? 'You: ' : '';

  return (
    <div
      onClick={onClick}
      className="flex items-center p-2 hover:border-gray-500  rounded-xl cursor-pointer transition-colors duration-200 border border-gray-800 bg-[#303030]"
    >
      <div className="relative flex-shrink-0">
        <Avatars
          userId={userId}
          name={fullName}
          imageUrl={profileImage}
          width={50}
          height={50}
        />
        {/* ✅ Online indicator dot */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white truncate text-sm sm:text-base">
            {fullName}
          </h3>
          <span className="text-xs text-white whitespace-nowrap">
            {formatTime(lastMsgTime)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p
            className={`text-sm truncate ${
              unseenMsgCount > 0 && !isOwnMessage
                ? 'font-semibold text-gray-900'
                : 'text-white'
            }`}
          >
            {lastMsgText ? `${messagePrefix}${truncateMessage(lastMsgText)}` : 'No messages yet'}
          </p>
          {unseenMsgCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center flex-shrink-0 ml-2">
              {unseenMsgCount > 99 ? '99+' : unseenMsgCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;