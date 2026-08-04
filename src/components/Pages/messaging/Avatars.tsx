/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

// ✅ Fixed path: onlineUser is at state.auth.onlineUser, not state.auth.user.onlineUser
const selectOnlineUsers = createSelector(
  [(state: any) => state?.auth?.onlineUser ?? []],
  (onlineUser) => onlineUser
); 

const Avatars = ({ userId, name, imageUrl, width, height }: { userId?: string; name?: string; imageUrl?: string; width: number; height: number; }) => {
  const onlineUser = useSelector(selectOnlineUsers);

  let avatarName = "";

  if (name) {
    const splitName = name.split(" ");
    avatarName = splitName.length > 1 ? splitName[0][0] + splitName[1][0] : splitName[0][0];
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ];

  const randomNumber = Math.floor(Math.random() * bgColor.length);

  const isOnline = Array.isArray(onlineUser) && onlineUser.includes(userId);

  return (
    <div
      className="text-slate-800 rounded-full font-bold relative"
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={width}
          height={height}
          alt={name || "user"}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}

      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatars;