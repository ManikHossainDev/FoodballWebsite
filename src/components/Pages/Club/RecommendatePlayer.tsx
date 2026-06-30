"use client";

import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Player {
  id: string;
  name: string;
  position: string;
  experience: string;
  club: string;
}

const players: Player[] = [
  { id: "1", name: "Marcus Silva", position: "Forward", experience: "5 years", club: "Barcelona FC" },
  { id: "2", name: "Marcus Silva", position: "Forward", experience: "5 years", club: "Barcelona FC" },
  { id: "3", name: "Marcus Silva", position: "Forward", experience: "5 years", club: "Barcelona FC" },
  { id: "4", name: "Marcus Silva", position: "Forward", experience: "5 years", club: "Barcelona FC" },
  { id: "5", name: "Marcus Silva", position: "Forward", experience: "5 years", club: "Barcelona FC" },
  { id: "6", name: "Marcus Silva", position: "Forward", experience: "5 years", club: "Barcelona FC" },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("");
  return (
    <div className="w-20 h-20 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-zinc-300 font-semibold text-sm shrink-0">
      {initials}
    </div>
  );
}

function PlayerRow({ player }: { player: Player }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/clubrecommendateplayer/${player.id}`);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // message agent logic here
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex items-center justify-between bg-zinc-800/80 rounded-xl px-4 py-3 cursor-pointer hover:bg-zinc-800 transition-colors"
    >
      <div className="flex items-center gap-4">
        <Avatar name={player.name} />
        <div>
          <p className="text-white font-semibold text-sm leading-tight">{player.name}</p>
          <div className="text-zinc-400 text-xs leading-relaxed">
            <p>
              <span className="text-zinc-500">Position</span>{" "}
              <span className="text-zinc-300">{player.position}</span>
            </p>
            <p>
              <span className="text-zinc-500">Experience</span>{" "}
              <span className="text-zinc-300">{player.experience}</span>
            </p>
            <p>
              <span className="text-zinc-500">Preferred Club</span>{" "}
              <span className="text-zinc-300">{player.club}</span>
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={handleMessageClick}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-full"
      >
        <MessageCircle size={16} />
        Message Agent
      </button>
    </div>
  );
}

const RecommendatePlayer = () => {
  return (
    <div className="bg-[#303030] rounded-lg p-5">
      <div className="flex flex-col gap-3">
        {players.map((player) => (
          <PlayerRow key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default RecommendatePlayer;