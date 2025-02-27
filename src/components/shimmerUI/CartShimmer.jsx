import React from 'react'

export default function CartShimmer() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen">
        <div className="animate-pulse bg-gray-200 h-10 w-48 rounded mb-8" />
        
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-t-2 border-gray-200">
                <th className="text-left py-4 px-4">Product</th>
                <th className="text-left py-4 px-4">Price</th>
                <th className="text-left py-4 px-4">Quantity</th>
                <th className="text-left py-4 px-4">Total</th>
                <th className="text-left py-4 px-4"></th>
              </tr>
            </thead>
            
            <tbody>
              {[1, 2, 3].map((item) => (
                <tr key={item} className="border-b border-gray-200">
                  <td className="py-6 px-4 flex items-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg mr-4 animate-pulse" />
                    <div className="h-4 bg-gray-200 w-48 rounded animate-pulse" />
                  </td>
                  
                  <td className="py-6 px-4">
                    <div className="h-4 bg-gray-200 w-16 rounded animate-pulse" />
                  </td>
                  
                  <td className="py-6 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-l animate-pulse" />
                      <div className="w-12 h-8 bg-gray-200 border-t border-b animate-pulse" />
                      <div className="w-8 h-8 bg-gray-200 rounded-r animate-pulse" />
                    </div>
                  </td>
                  
                  <td className="py-6 px-4">
                    <div className="h-4 bg-gray-200 w-16 rounded animate-pulse" />
                  </td>
                  
                  <td className="py-6 px-4">
                    <div className="h-4 bg-gray-200 w-16 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-right">
          <div className="text-2xl font-bold">
            <div className="h-6 bg-gray-200 w-32 inline-block rounded animate-pulse" />
          </div>
          <div className="mt-4 bg-gray-200 h-12 w-32 inline-block rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  )
}
