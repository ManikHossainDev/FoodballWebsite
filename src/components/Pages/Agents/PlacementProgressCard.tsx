"use client"
import { useState } from 'react';
import user from '@/assets/Authentication/user.jpg';
import Image from 'next/image';

// Types
interface Order {
  id: number;
  name: string;
  seller: string;
  price: string;
  status: string;
  daysLeft: string;
  buttonText: string;
  buttonAction: string;
}

interface Tab {
  id: 'Profile Recommended' | 'Placement Completed';
  label: string;
  count: number;
}

type OrderCategory = 'Profile Recommended' | 'Placement Completed';

const PlacementProgressCard = () => {
  const [activeTab, setActiveTab] = useState<Tab['id']>('Profile Recommended');

  const orders: Record<OrderCategory, Order[]> = {
    'Profile Recommended': [
      { id: 1, name: 'Marcus Silva', seller: 'Pinheiro', price: 'Forward', status: '5 years', daysLeft: 'Barcelona FC', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 2, name: 'Lionel Messi', seller: 'Rosario', price: 'Forward', status: '3 years', daysLeft: 'PSG', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 3, name: 'Cristiano Ronaldo', seller: 'Madeira', price: 'Forward', status: '2 years', daysLeft: 'Al-Nassr', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 4, name: 'Neymar Jr', seller: 'Santos', price: 'Forward', status: '4 years', daysLeft: 'PSG', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 5, name: 'Kylian Mbappé', seller: 'Bondy', price: 'Forward', status: '3 years', daysLeft: 'PSG', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 6, name: 'Erling Haaland', seller: 'Bryne', price: 'Forward', status: '4 years', daysLeft: 'Manchester City', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 7, name: 'Kevin De Bruyne', seller: 'Drongen', price: 'Midfielder', status: '5 years', daysLeft: 'Manchester City', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 8, name: 'Virgil van Dijk', seller: 'Breda', price: 'Defender', status: '6 years', daysLeft: 'Liverpool', buttonText: 'Message Player', buttonAction: 'Message Club' },
    ],
    'Placement Completed': [
      { id: 9, name: 'Robert Lewandowski', seller: 'Warsaw', price: 'Forward', status: '3 years', daysLeft: 'Barcelona FC', buttonText: 'Message Player', buttonAction: 'Message Club' },
      { id: 10, name: 'Mohamed Salah', seller: 'Nagrig', price: 'Forward', status: '5 years', daysLeft: 'Liverpool', buttonText: 'Message Player', buttonAction: 'Message Club' },
    ],
  };

  const tabs: Tab[] = [
    { id: 'Profile Recommended', label: 'Profile Recommended', count: orders['Profile Recommended'].length },
    { id: 'Placement Completed', label: 'Placement Completed', count: orders['Placement Completed'].length },
  ];

  return (
    <div className="bg-[#303030] p-1 md:p-4 rounded-lg">
      <div>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-[#3F3F3F] py-3 px-1 md:px-3 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 md:px-6 py-2.5 rounded-lg text-[11px] font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                  : 'bg-transparent text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {orders[activeTab].map((order) => (
            <div key={order.id} className="bg-[#3F3F3F] rounded-lg overflow-hidden border border-gray-700 p-4">
              <div className="xl:flex gap-4">
                {/* Player Image */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-md overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      src={user}
                      className='rounded-md object-cover w-full h-full'
                      alt={order.name}
                    />
                  </div>
                </div>

                {/* Player Info */}
                <div className="flex-1 text-xs">
                  <h3 className="text-white font-semibold text-base">{order.name}</h3>

                  <div className='flex space-x-2 text-sm'>
                    <p className='text-[#737373]'>Position :</p>
                    <p className="text-[#BFBFBF]">{order.price}</p>
                  </div>
                  <div className='flex space-x-2 text-sm'>
                    <p className='text-[#737373]'>Experience :</p>
                    <p className="text-[#BFBFBF]">{order.status}</p>
                  </div>
                  <div className='flex space-x-2 text-sm'>
                    <p className='text-[#737373]'>Preferred Club :</p>
                    <p className="text-[#BFBFBF]">{order.daysLeft}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 justify-center">
                  
                  <button className="bg-[#2C2C2C] hover:bg-[#3C3C3C] border border-[#E43636]  text-white px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Message Player
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders[activeTab].length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No players in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementProgressCard;