"use client"
import { useState } from 'react';
import Image from 'next/image';
import user from '@/assets/Authentication/user.jpg';
import { Plus, X, Camera } from 'lucide-react';

interface FormData {
  fullName: string;
  age: string;
  position: string;
  location: string;
  phone: string;
  email: string;
  currentClub: string;
  currentTeam: string;
  careerGoal: string;
  achievements: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

const Page = () => {
  const formData: FormData = {
    fullName: 'Marcus Silva',
    age: '25',
    position: 'Forward',
    location: 'Barcelona, Spain',
    phone: '+880 1000000000',
    email: 'marcus123@gmail.com',
    currentClub: 'Marcus Silva',
    currentTeam: 'Marcus Silva',
    careerGoal: 'Marcus Silva',
    achievements: '15 Total',
    facebook: 'https://www.facebook.com/profile.php?id=61578058744454',
    instagram: 'https://www.facebook.com/profile.php?id=61578058744454',
    linkedin: 'https://www.linkedin.com/in/luxux-md-nurunnabi/',
    twitter: 'https://www.facebook.com/profile.php?id=61578058744454'
  };

  const [skills, setSkills] = useState<string[]>(['Dribbling', 'Shooting', 'Speed']);
  const [newSkill, setNewSkill] = useState<string>('');
  const [showSkillInput, setShowSkillInput] = useState<boolean>(false);



  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setShowSkillInput(false);
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2
        className="text-xl md:text-2xl font-bold text-white py-3"
        style={{
          textShadow:
            "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff0000",
        }}
      >
        Edit Profile
      </h2>
      <p className="text-[#8F8F8F] mb-2">Edit Your Details & Upload Performance Videos</p>

      <div className="">
        <div className="w-full ">
          {/* Header Section */}
          <div className="bg-[#303030] rounded-2xl p-6 flex items-center justify-between mb-2 ">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src={user}
                  alt="David Martinez"
                  fill
                  className="rounded-full object-cover border-2 border-[#FFFFFF]"
                />
                <div className="absolute bottom-0 right-0 bg-[#FFFFFF] rounded-full p-1">
                  <Camera className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <h1 className="text-white text-xl font-semibold">David Martinez</h1>
                <p className="text-gray-400 text-sm">Forward</p>
              </div>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              Save
            </button>
          </div>
         
          {/* About Section */}
          <div className="bg-[#303030] px-6 py-4  rounded-2xl">
            <div className=" mb-3 md:mb-5">
              <h2 className="text-white font-semibold mb-2">About</h2>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                David Martinez is a highly experienced coach specializing in technical skills. With 16 years of professional coaching experience, they have helped countless players improve their game and advance their careers. Their approach combines technical expertise with personalized feedback to help you reach your full potential.
              </p>
            </div>
            <div className="">
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
                  {/* Left Column - Personal Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Age</label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Position</label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>
                  </div>

                  {/* Right Column - Professional Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Current Club</label>
                      <input
                        type="text"
                        name="currentClub"
                        value={formData.currentClub}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Current Team</label>
                      <input
                        type="text"
                        name="currentTeam"
                        value={formData.currentTeam}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Career Goal</label>
                      <input
                        type="text"
                        name="careerGoal"
                        value={formData.careerGoal}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>
            
                    {/* Key Skills */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-3">Key Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(index)}
                              className="hover:bg-red-700 rounded-full p-0.5 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                
                        {showSkillInput ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                              placeholder="New skill"
                              className="bg-[#FFFFFF] text-white px-3 py-2 rounded text-sm outline-none focus:ring-2 focus:ring-red-500"
                              autoFocus
                            />
                            <button
                              onClick={addSkill}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                            >
                              Add
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowSkillInput(true)}
                            className="inline-flex items-center justify-center w-10 h-10 bg-[#525252] hover:bg-gray-600 text-white rounded transition-colors"
                          >
                            <Plus size={20} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Achievements</label>
                      <input
                        type="text"
                        name="achievements"
                        value={formData.achievements}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Facebook</label>
                      <input
                        type="url"
                        name="facebook"
                        value={formData.facebook}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Instagram</label>
                      <input
                        type="url"
                        name="instagram"
                        value={formData.instagram}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Linked In</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">X</label>
                      <input
                        type="url"
                        name="twitter"
                        value={formData.twitter}
                        className="w-full bg-[#525252] border border-[#FFFFFF] text-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Page;