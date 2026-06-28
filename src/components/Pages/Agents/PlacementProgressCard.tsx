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
  id: 'New' | 'ProfileSent' | 'PlacementCompleted';
  label: string;
  count: number;
}

type OrderCategory = 'New' | 'ProfileSent' | 'PlacementCompleted';

const PlacementProgressCard = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState<Tab['id']>('New');

  // Sample data for orders
  const orders : Record<OrderCategory, Order[]> = {
  New: [
    { id: 1, name: 'Marcus Silva', seller: 'Pinheiro', price: 'Forward', status: '5 years', daysLeft: 'Barcelona FC', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 2, name: 'Lionel Messi', seller: 'Rosario', price: 'Forward', status: '3 years', daysLeft: 'PSG', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 3, name: 'Cristiano Ronaldo', seller: 'Madeira', price: 'Forward', status: '2 years', daysLeft: 'Al-Nassr', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 4, name: 'Neymar Jr', seller: 'Santos', price: 'Forward', status: '4 years', daysLeft: 'PSG', buttonText: 'Message Player', buttonAction: 'Message Club' },
  ],
  ProfileSent: [
    { id: 5, name: 'Kylian Mbappé', seller: 'Bondy', price: 'Forward', status: '3 years', daysLeft: 'PSG', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 6, name: 'Erling Haaland', seller: 'Bryne', price: 'Forward', status: '4 years', daysLeft: 'Manchester City', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 7, name: 'Kevin De Bruyne', seller: 'Drongen', price: 'Midfielder', status: '5 years', daysLeft: 'Manchester City', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 8, name: 'Virgil van Dijk', seller: 'Breda', price: 'Defender', status: '6 years', daysLeft: 'Liverpool', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 9, name: 'Kevin De Bruyne', seller: 'Drongen', price: 'Midfielder', status: '5 years', daysLeft: 'Manchester City', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 10, name: 'Virgil van Dijk', seller: 'Breda', price: 'Defender', status: '6 years', daysLeft: 'Liverpool', buttonText: 'Message Player', buttonAction: 'Message Club' },
  ],
  PlacementCompleted: [
    { id: 9, name: 'Robert Lewandowski', seller: 'Warsaw', price: 'Forward', status: '3 years', daysLeft: 'Barcelona FC', buttonText: 'Message Player', buttonAction: 'Message Club' },
    { id: 10, name: 'Mohamed Salah', seller: 'Nagrig', price: 'Forward', status: '5 years', daysLeft: 'Liverpool', buttonText: 'Message Player', buttonAction: 'Message Club' },
  ],
};

  // Mapping Tab ID to orders key
  const tabToOrderKey: Record<Tab['id'], OrderCategory> = {
    New: 'New',
    ProfileSent: 'ProfileSent',
    PlacementCompleted: 'PlacementCompleted',
  };

  // Tab configuration
  const tabs: Tab[] = [
    { id: 'New', label: 'New', count: orders.New.length },
    { id: 'ProfileSent', label: 'Profile Sent', count: orders.ProfileSent.length },
    { id: 'PlacementCompleted', label: 'Placement Completed', count: orders.PlacementCompleted.length },
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
                  ? 'bg-white text-red-500 '
                  : 'bg-transparent text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {orders[tabToOrderKey[activeTab]].map((order) => (
            <div key={order.id} className="bg-[#3F3F3F] rounded-lg overflow-hidden border border-gray-700 p-4">
              <div className="xl:flex gap-4">
                {/* Player Image */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                      <Image 
                                        width={100} 
                                        height={100} 
                                        src={user} 
                                        className='rounded-md object-cover w-full h-full' 
                                        alt='user' 
                                      />
                                    </div>
                </div>

                {/* Player Info */}
                <div className="flex-1 text-xs">
                  <h3 className="text-white font-semibold text-base">{order.name}</h3>
                   
                   <div className='flex space-x-2 text-sm'>
                    <p className='text-[#737373]'>Position : </p>
                    <p className="text-[#BFBFBF]">{order.price}</p>
                   </div>
                   <div className='flex space-x-2 text-sm'>
                    <p className='text-[#737373]'>Experience : </p>
                    <p className="text-[#BFBFBF]">{order.status}</p>
                   </div>
                   <div className='flex space-x-2 text-sm'>
                    <p className='text-[#737373]'>Recommended to :</p>
                    <p className="text-[#BFBFBF]">{order.daysLeft}</p>
                   </div>
                </div>

                  {/* Action Buttons */}
                <div className="flex flex-col gap-2 justify-center">
                  {/* Show "Message Player" button only in Profile Sent tab */}
                  {activeTab === 'ProfileSent' && (
                    <button className="bg-[#E84C3D] hover:bg-[#C0392B] text-white px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      {order.buttonText}
                    </button>
                  )}
                  <button className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white px-4 py-2 rounded text-sm font-medium transition-colors border border-gray-600 whitespace-nowrap flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {order.buttonAction}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders[tabToOrderKey[activeTab]].length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No orders in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementProgressCard;