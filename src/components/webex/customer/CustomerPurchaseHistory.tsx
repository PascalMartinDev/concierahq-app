import React, { useState } from 'react';
import { purchaseHistory } from '../../../data/sampleOrder';

const CustomerPurchaseHistory: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [visibleOrders, setVisibleOrders] = useState(2);

  return (
    <div className='my-5 mx-10'>
      {/* Full Row Grid Container Layout  */}
      <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 w-full">
        <div className="min-w-0 flex-1">
          {/* Header with Expand/Collapse Button
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Purchase History</h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-bold"
            >
              {isExpanded ? '−' : '+'}
            </button>
          </div>  */}


          {/* Purchase History List - Collapsible */}
          {isExpanded && (
            <div className="space-y-4">
              {/* Single Header for All Items */}
              <div className="flex gap-4">
                <div className="w-1/4"></div>
                <div className="w-3/4">
                  <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-300 font-medium text-sm text-gray-700">
                    <div>Item Name</div>
                    <div>Quantity</div>
                    <div>SKU</div>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              {purchaseHistory.slice(0, visibleOrders).map((order) => (
                <div key={order.orderId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-4">
                    {/* Left: Order Details (1/4 width) */}
                    <div className="w-1/4 text-gray-600">
                      <div className="font-medium text-gray-900">Order #{order.orderId}</div>
                      <div className="text-sm">{order.date}</div>
                      <div className="text-sm">{order.location}</div>
                    </div>

                    {/* Right: Items List (3/4 width) */}
                    <div className="w-3/4">
                      {/* Items List - Show All Items */}
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4 py-1 text-sm">
                            <div className="text-gray-700">{item.product}</div>
                            <div className="text-gray-700">{item.quantity}</div>
                            <div className="text-gray-500">{item.sku}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show More Orders Link */}
              {visibleOrders < purchaseHistory.length && (
                <div className="text-center">
                  <button
                    onClick={() => setVisibleOrders(prev => prev + 2)}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Show more orders ({purchaseHistory.length - visibleOrders} remaining)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPurchaseHistory;
