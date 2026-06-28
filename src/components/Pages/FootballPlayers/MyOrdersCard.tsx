import { useState } from 'react';

// Types
interface Order {
  id: number;
  type: string;
  seller: string;
  price: string;
  status: string;
  daysLeft: string;
  buttonText: string;
  buttonAction: string;
}

interface Tab {
  id: 'active' | 'pending' | 'completed';
  label: string;
  count: number;
}

type OrderCategory = 'active' | 'pending' | 'completed';

const MyOrdersCard = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState<OrderCategory>('active');

  // Sample data for orders
  const orders: Record<OrderCategory, Order[]> = {
    active: [
      {
        id: 1,
        type: 'Career Consultation',
        seller: 'Sarvat Khan',
        price: 'US$ 4',
        status: 'Awaiting Seller',
        daysLeft: 'Oct 24',
        buttonText: 'View Details',
        buttonAction: 'Awaiting Acceptance'
      },
      {
        id: 2,
        type: 'Career Consultation',
        seller: 'Sarvat Khan',
        price: 'US$ 4',
        status: 'Awaiting Seller',
        daysLeft: 'Oct 24',
        buttonText: 'View Details',
        buttonAction: 'Awaiting Acceptance'
      }
    ],
    pending: [
      {
        id: 3,
        type: 'Career Consultation',
        seller: 'Sarvat Khan',
        price: 'US$ 4',
        status: 'Pending Requests',
        daysLeft: 'Oct 24',
        buttonText: 'View Details',
        buttonAction: 'Awaiting Response'
      },
      {
        id: 4,
        type: 'Career Consultation',
        seller: 'Sarvat Khan',
        price: 'US$ 4',
        status: 'Pending',
        daysLeft: 'Oct 24',
        buttonText: 'View Details',
        buttonAction: 'Awaiting Response'
      }
    ],
    completed: [
      {
        id: 5,
        type: 'Career Consultation',
        seller: 'Sarvat Khan',
        price: 'US$ 4',
        status: 'Delivered',
        daysLeft: 'Oct 24',
        buttonText: 'View Details',
        buttonAction: 'Awaiting Response'
      },
      {
        id: 6,
        type: 'Career Consultation',
        seller: 'Sarvat Khan',
        price: 'US$ 4',
        status: 'Delivered',
        daysLeft: 'Oct 24',
        buttonText: 'View Details',
        buttonAction: 'Awaiting Response'
      }
    ]
  };

  // Tab configuration
  const tabs: Tab[] = [
    { id: 'active', label: 'Active Orders', count: orders.active.length },
    { id: 'pending', label: 'Pending', count: orders.pending.length },
    { id: 'completed', label: 'Completed', count: orders.completed.length }
  ];

  return (
    <div className=" bg-[#303030] p-1 md:p-4 rounded-md">
      <div >
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-[#3F3F3F] py-3 px-2 md:px-3 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 text-[10px] md:text-md  md:px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`
              
            }
            
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {orders[activeTab].map((order) => (
            <div
              key={order.id}
              className="bg-[#3F3F3F] rounded-lg overflow-hidden border border-gray-700"
            >
              {/* Order Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {order.type}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Seller: {order.seller}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{order.status}</p>
                    <p className="text-white font-semibold mt-1">
                      {order.price}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Due Date</span>
                  <span className="text-white">{order.daysLeft}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 space-y-2">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded transition-colors">
                  {order.buttonText}
                </button>
                
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (optional) */}
        {orders[activeTab].length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No orders in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersCard;