/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { PiChecks } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import moment from "moment";
import Image from "next/image";
import { IoClose, IoArrowBack } from "react-icons/io5"; // ✅ ADDED IoArrowBack
import { FaImage } from "react-icons/fa";
import { useSocket } from "@/context/SocketContext";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { TiMessageTyping } from "react-icons/ti";
import { useGetUserProfileQuery } from "@/redux/features/Profile/Profile";
import { useRouter } from "next/navigation"; // ✅ ADDED

/*** Types ***/
interface MessageAuthor {
  _id: string;
  name?: string;
  image?: string;
}

interface MessageData {
  text: string;
  image?: string | null;
  imageUrl?: string;
  videoUrl?: string;
  fileUrl?: string;
  linkUrl?: string;
  type?: string;
  msgByUserId?: string;
  author?: MessageAuthor;
  createdAt?: string;
}

const Message = ({ receiverId }: { receiverId: string }) => {
  const router = useRouter(); // ✅ ADDED
  const { data } = useGetUserProfileQuery(receiverId);
  const { name: receiverName, image: receiverImage, role: receiverRole } = data?.data || {};
  const { socket, connected } = useSocket();
  const user = useSelector(selectCurrentUser);
  const currentUserId = user?._id;
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageData>({
    text: "",
    imageUrl: undefined,
    videoUrl: undefined,
    fileUrl: undefined,
    linkUrl: undefined,
    type: "text",
  });

  const [allMessage, setAllMessage] = useState<MessageData[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

  const currentMessage = useRef<HTMLDivElement | null>(null);

  /*** handle input change ***/
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage((prev) => ({
      ...prev,
      text: value,
      type: "text",
      imageUrl: undefined,
      videoUrl: undefined,
      fileUrl: undefined,
      linkUrl: undefined,
    }));
  };

  /*** auto scroll to bottom when new message arrives ***/
  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessage]);

  /*** toggle upload modal ***/
  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((prev) => !prev);
  };

  /*** ✅ ADDED: back to chat list (mobile only) ***/
  const handleBackToList = () => {
    router.push("/messaging");
  };

  /*** socket listeners ***/
  useEffect(() => {
    if (socket && connected && receiverId && currentUserId) {
      socket.emit("Conversation", {
        users: [currentUserId, receiverId],
        page: 1,
        limit: 20,
      });
      socket.emit("Message", receiverId);

      const handleAnyEvent = (event: string, ...args: any[]) => {
        console.log("📩 [onAny] Received event:", event, args);
      };
      socket.onAny(handleAnyEvent);

      const handleConversation = (data: any) => {
        const convoId = data?.data?.conversation?._id ?? null;
        const list = data?.data?.messages?.data ?? [];
        if (convoId) setConversationId(convoId);

        const sortedList = Array.isArray(list)
          ? [...list].sort(
              (a: any, b: any) =>
                new Date(a?.createdAt ?? 0).getTime() -
                new Date(b?.createdAt ?? 0).getTime()
            )
          : [];
        setAllMessage(sortedList);
      };

      const handleNewMessage = (data: any) => {
        const newMsg = data?.data?.message ?? data?.data ?? data;
        if (!newMsg) return;

        setAllMessage((prev) => {
          const alreadyExists =
            newMsg?._id && prev.some((m: any) => m?._id === newMsg._id);
          if (alreadyExists) return prev;
          return [...prev, newMsg];
        });
      };

      socket.on("Conversation", handleConversation);
      socket.on("Message", handleNewMessage);

      return () => {
        socket.off("Conversation", handleConversation);
        socket.off("Message", handleNewMessage);
        socket.offAny(handleAnyEvent);
      };
    }
  }, [socket, connected, receiverId, currentUserId]);

  /*** send message (text / image / video / file) ***/
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!conversationId) return;
    if (isSending) return;

    if (
      message.text ||
      message.imageUrl ||
      message.videoUrl ||
      message.fileUrl ||
      message.linkUrl
    ) {
      if (socket) {
        setIsSending(true);
        const messageData: Record<string, any> = {
          conversation: conversationId,
          text: message.text,
        };
        if (message.imageUrl) messageData.imageUrl = message.imageUrl;
        if (message.videoUrl) messageData.videoUrl = message.videoUrl;
        if (message.fileUrl) messageData.fileUrl = message.fileUrl;

        socket.emit("Message", messageData);
        setMessage({
          text: "",
          imageUrl: undefined,
          videoUrl: undefined,
          fileUrl: undefined,
          linkUrl: undefined,
          type: "text",
        });
        setTimeout(() => setIsSending(false), 500);
      }
    }
  };

  /*** send message (link) ***/
  const handleSendLink = () => {
    if (!conversationId) return;

    try {
      new URL(message.text);
      if (socket) {
        const messageData = {
          conversation: conversationId,
          text: message.text,
        };
        socket.emit("Message", messageData);
        setMessage({
          text: "",
          imageUrl: undefined,
          videoUrl: undefined,
          fileUrl: undefined,
          linkUrl: undefined,
          type: "text",
        });
      }
    } catch (e) {
      console.log("Not a valid URL", e);
    }
  };

  return (
    <section className="w-full h-full flex flex-col rounded-md  border border-gray-800 ">
      {/*** Header Section ***/}
      <header className="sticky top-0 h-16 bg-black flex justify-between items-center px-2 md:px-4 border border-gray-800 rounded-md shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* ✅ ADDED: mobile-only back button */}
          <button
            type="button"
            onClick={handleBackToList}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-gray-800 shrink-0"
          >
            <IoArrowBack size={20} />
          </button>
          <div className="min-w-0">
            <h2 className="font-semibold text-white truncate">{receiverName}</h2>
            <p className="text-sm text-gray-400 truncate">{receiverRole}</p>
          </div>
        </div>
        {receiverImage && (
          <Image
            src={receiverImage}
            alt={receiverName || "user"}
            width={40}
            height={40}
            className="rounded-full h-[40px] w-[40px] object-cover border border-gray-700 shrink-0"
          />
        )}
      </header>

      {/*** Chat Section ***/}
      <section className="flex-1 min-h-0 overflow-x-hidden overflow-y-scroll scrollbar scroll-hide relative  bg-opacity-50 px-2 pb-3">
        {/*** Messages ***/}
        <div className="flex flex-col gap-2 py-2 mx-1 md:mx-2" ref={currentMessage}>
          {allMessage?.map((msg, index) => {
            const isOwnMessage =
              msg?.author?._id === currentUserId ||
              (msg as any)?.sender?._id === currentUserId ||
              (msg as any)?.sender === currentUserId ||
              (msg as any)?.user?._id === currentUserId ||
              msg?.msgByUserId === currentUserId;

            return (
              <div
                key={index}
                className={`p-1 py-1 rounded w-fit max-w-[80%] sm:max-w-[320px] md:max-w-sm lg:max-w-md border 
          ${
  isOwnMessage
    ? "ml-auto bg-gray-300 text-black border-white/80 shadow-sm"
    : "bg-[#2a2a2a] text-white border-white/10"
}`}
              >
                <div className="w-full relative">
                  {(msg?.image || msg?.imageUrl) && (
                    <Image
                      src={(msg?.image ?? msg?.imageUrl) as string}
                      className="w-full h-full object-scale-down"
                      alt="chat-img"
                      width={300}
                      height={300}
                    />
                  )}
                  {msg?.type === "video" && msg?.videoUrl && (
                    <video
                      src={msg.videoUrl}
                      className="w-full h-full object-scale-down"
                      controls
                    />
                  )}
                  {msg?.type === "file" && msg?.fileUrl && (
                    <div className="flex items-center p-2 bg-neutral-800 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <Link
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline"
                      >
                        Download File
                      </Link>
                    </div>
                  )}
                  {msg?.type === "link" && msg?.linkUrl && (
                    <div className="p-2 bg-neutral-800 rounded">
                      <Link
                        href={msg.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline"
                      >
                        {msg.linkUrl}
                      </Link>
                    </div>
                  )}
                </div>
                {msg?.text && <p className="px-2 break-words">{msg.text}</p>}
                <p
                  className={`text-xs ml-auto w-fit flex items-center gap-1 ${
                    isOwnMessage ? "text-black/60" : "text-gray-400"
                  }`}
                >
                  <PiChecks className={isOwnMessage ? "text-black/60" : "text-[#84D3FF]"} />
                  {msg.createdAt
                    ? moment(msg.createdAt).isSame(moment(), "day")
                      ? moment(msg.createdAt).format("hh:mm A")
                      : moment(msg.createdAt).format("MMM D, hh:mm A")
                    : ""}
                </p>
              </div>
            );
          })}
        </div>

        {/*** Preview Before Sending ***/}
        {(message.imageUrl ||
          message.videoUrl ||
          message.fileUrl ||
          message.linkUrl) && (
          <div className="w-full h-full sticky bottom-0 bg-black bg-opacity-70 flex justify-center items-center rounded overflow-hidden border border-gray-800">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer text-white hover:text-red-500"
              onClick={() =>
                setMessage({
                  text: "",
                  imageUrl: undefined,
                  videoUrl: undefined,
                  fileUrl: undefined,
                  linkUrl: undefined,
                  type: "text",
                })
              }
            >
              <IoClose size={30} />
            </div>
            <div className="bg-[#303030] p-3 border border-gray-800 rounded">
              {message.imageUrl && (
                <Image
                  src={message.imageUrl}
                  alt="uploadImage"
                  className="aspect-square w-full h-full max-w-[220px] sm:max-w-sm m-2 object-scale-down"
                  width={200}
                  height={200}
                />
              )}
              {message.videoUrl && (
                <video
                  src={message.videoUrl}
                  className="aspect-square w-full h-full max-w-[220px] sm:max-w-sm m-2 object-scale-down"
                  controls
                />
              )}
              {message.fileUrl && (
                <div className="flex items-center p-2 bg-neutral-800 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-white">File selected</span>
                </div>
              )}
              {message.linkUrl && (
                <div className="p-2 bg-neutral-800 rounded">
                  <Link
                    href={message.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline"
                  >
                    {message.linkUrl}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/*** Input Section ***/}
      <section className="h-16 bg-black border border-gray-800 rounded-b-md flex items-center px-2 md:px-4 shrink-0">
        <div className="relative">
          <button
            onClick={handleUploadImageVideoOpen}
            type="button"
            className="flex justify-center items-center w-10 h-10 md:w-11 md:h-11 rounded-full text-white hover:bg-neutral-800 hover:text-white"
          >
            <TiMessageTyping size={30} />
          </button>

          {/*** Dropdown for Image / Video Upload ***/}
          {openImageVideoUpload && (
            <div className="bg-black border border-gray-800 shadow rounded absolute bottom-14 w-36 p-2 z-10">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-neutral-800 cursor-pointer text-white"
                >
                  <div className="text-white">
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>

                <input
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setMessage({
                        text: "",
                        imageUrl: url,
                        videoUrl: undefined,
                        fileUrl: undefined,
                        linkUrl: undefined,
                        type: "image",
                      });
                    }
                    setOpenImageVideoUpload(false);
                  }}
                />

                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-neutral-800 cursor-pointer text-white"
                >
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  id="uploadVideo"
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setMessage({
                        text: "",
                        imageUrl: undefined,
                        videoUrl: url,
                        fileUrl: undefined,
                        linkUrl: undefined,
                        type: "video",
                      });
                    }
                    setOpenImageVideoUpload(false);
                  }}
                />

                <label
                  htmlFor="uploadFile"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-neutral-800 cursor-pointer text-white"
                >
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>File</p>
                </label>

                <input
                  type="file"
                  id="uploadFile"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setMessage({
                        text: "",
                        imageUrl: undefined,
                        videoUrl: undefined,
                        fileUrl: url,
                        linkUrl: undefined,
                        type: "file",
                      });
                    }
                    setOpenImageVideoUpload(false);
                  }}
                />
              </form>
            </div>
          )}
        </div>

        {/*** Text Input + Send Button ***/}
        <form
          className="h-full w-full flex  gap-2 ml-2 bg-black"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            placeholder="Type here message..."
            className="py-1 px-3 md:px-4 outline-none border border-gray-800 w-full h-full min-w-0 bg-black text-white placeholder-gray-500"
            value={message.text}
            onChange={handleOnChange}
          />
          <button className="text-white hover:text-gray-300 shrink-0 pr-2" type="submit">
            <IoMdSend size={26} />
          </button>
        </form>
      </section>
    </section>
  );
};

export default Message;