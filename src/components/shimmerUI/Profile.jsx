// components/ShimmerProfile.js
import React from 'react';

const ShimmerProfile = () => {
  return (
    <div className="w-11/12 mx-auto my-10 py-8 animate-pulse">
      {/* Header Shimmer */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 md:mb-0"></div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>

      {/* Order History Shimmer */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[1, 2, 3, 4].map((i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  {[1, 2, 3, 4].map((cell) => (
                    <td key={cell} className="px-6 py-4">
                      <div className={`h-4 bg-gray-200 rounded ${cell === 3 ? 'w-16' : 'w-3/4'}`}></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShimmerProfile;