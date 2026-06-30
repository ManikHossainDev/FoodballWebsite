"use client";

import Image from "next/image";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

type Player = {
  id: number;
  name: string;
  position: string;
  experience: string;
  club: string;
  image: string;
};

type Agent = {
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  experience: string;
  currentTeam: string;
  currentClub: string;
  careerGoal: string;
  skills: string[];
  successfulTransfers: string;
  image: string;
};

type MessageTarget = Pick<Player, "name"> & Partial<Player>;

const players: Player[] = [
  {
    id: 1,
    name: "Marcus Silva",
    position: "Forward",
    experience: "5 years",
    club: "Barcelona FC",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 2,
    name: "Marcus Silva",
    position: "Forward",
    experience: "5 years",
    club: "Barcelona FC",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 3,
    name: "Marcus Silva",
    position: "Forward",
    experience: "5 years",
    club: "Barcelona FC",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
];

const agent: Agent = {
  name: "David Martinez",
  email: "johnsmith@example.com",
  phone: "+1234567890",
  age: 25,
  location: "Barcelona, Spain",
  experience: "8 years",
  currentTeam: "Barcelona FC",
  currentClub: "Barcelona",
  careerGoal: "What the agent focuses on",
  skills: ["Player placement", "contract negotiation", "scouting"],
  successfulTransfers: "15 Total",
  image:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a430?w=700&q=80",
};

const WorkwithAgentsCardDetails = () => {
  const handleMessageAgent = () => {
    console.log(`Message agent: ${agent.name}`);
    // TODO: wire up to your messaging flow / API call
  };

  const handleMessagePlayer = (player: MessageTarget) => {
    console.log(`Message player: ${player.name}`);
    // TODO: wire up to your messaging flow / API call
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      {/* LEFT CARD */}
      <div className="w-full lg:w-[320px] self-start rounded-lg bg-[#353535] overflow-hidden flex flex-col">
        <div className="relative w-full ">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            className="object-cover w-20 h-20"
            priority
          />
        </div>

        <div className="p-4 flex-1">
          <h2 className="text-white text-lg font-semibold mb-4">
            {agent.name}
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center">
              <FiMail className="text-gray-400 mr-2" />
              <span className="text-gray-500 w-24">Email</span>
              <span className="text-gray-500 mr-2">:</span>
              <span className="text-gray-300">{agent.email}</span>
            </div>

            <div className="flex items-center">
              <FiPhone className="text-gray-400 mr-2" />
              <span className="text-gray-500 w-24">Phone Number</span>
              <span className="text-gray-500 mr-2">:</span>
              <span className="text-gray-300">{agent.phone}</span>
            </div>

            <div className="flex items-center">
              <FiUser className="text-gray-400 mr-2" />
              <span className="text-gray-500 w-24">Age</span>
              <span className="text-gray-500 mr-2">:</span>
              <span className="text-gray-300">{agent.age}</span>
            </div>
          </div>
        </div>

        <div className="p-4 flex gap-3">
          <button
            type="button"
            onClick={handleMessageAgent}
            className="flex-1 h-10 rounded border border-[#ef4444] bg-[#ef4444] text-white text-sm flex items-center justify-center gap-2 transition-colors hover:bg-[#dc2626] hover:border-[#dc2626] cursor-pointer"
          >
            <FiMessageSquare size={14} />
            Message Agent
          </button>

          <button
            type="button"
            onClick={() => handleMessagePlayer({ name: agent.name })}
            className="flex-1 h-10 rounded border border-gray-500 text-gray-300 text-sm flex items-center justify-center gap-2 transition-colors hover:bg-[#444] cursor-pointer"
          >
            <FiMessageSquare size={14} />
            Message player
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 rounded-lg bg-[#3b3b3b] p-6">
        <h2 className="text-white text-lg font-semibold mb-6">
          {agent.name}
        </h2>

        <div className="space-y-4 text-sm">
          <div className="flex">
            <span className="w-40 text-gray-500">Location</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">{agent.location}</span>
          </div>

          <div className="flex">
            <span className="w-40 text-gray-500">Experience</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">{agent.experience}</span>
          </div>

          <div className="flex">
            <span className="w-40 text-gray-500">Current Team</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">{agent.currentTeam}</span>
          </div>

          <div className="flex">
            <span className="w-40 text-gray-500">Current Club</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">{agent.currentClub}</span>
          </div>

          <div className="flex">
            <span className="w-40 text-gray-500">Career Goal</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-400">{agent.careerGoal}</span>
          </div>

          <div className="flex items-start">
            <span className="w-40 text-gray-500">Key Skills</span>
            <span className="text-gray-500 mr-3">:</span>

            <div className="flex gap-2 flex-wrap">
              {agent.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-red-500 text-white text-[11px] px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex">
            <span className="w-40 text-gray-500">Successful Transfers</span>
            <span className="text-gray-500 mr-3">:</span>
            <span className="text-gray-300">
              {agent.successfulTransfers}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-white font-medium mb-4">
            Players represented by this agent
          </h3>

          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-[#474747] rounded-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 shrink-0">
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="56px"
                      className="object-cover rounded-full"
                    />
                  </div>

                  <div>


                    <div className="text-xs mt-1 space-y-0.5">
                      <div className="flex gap-2">
                        <p className="text-gray-500 w-28">Name:</p>
                        <p className="text-gray-300"> {player.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-gray-500 w-28">Position:</p>
                        <p className="text-gray-300">{player.position}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-gray-500 w-28">Experience:</p>
                        <p className="text-gray-300">{player.experience}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="text-gray-500 w-28">Preferred:</p>
                        <p className="text-gray-300">{player.club}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleMessagePlayer(player)}
                  className="border border-red-500 text-white rounded px-5 h-10 text-sm flex items-center gap-2 transition-colors hover:bg-red-500 cursor-pointer"
                >
                  <FiMessageSquare />
                  Message player
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkwithAgentsCardDetails;