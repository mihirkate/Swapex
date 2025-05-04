"use client";

import { useEffect, useState } from "react";

interface Market {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume: number;
  change: number;
  trend: string; // Assuming this is a URL or a simple string
}

export default function MarketsPage() {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const response = await fetch(
          "https://exchange-proxy-mihir.work-mihirkate.workers.dev/api/v1/markets"
        );
        const data = await response.json();

        console.log("Fetched data:", data.slice(0,7)); // Debugging

        // Ensure correct mapping of fields
        const formattedData = data.map((market: any) => ({
          name: market.name,
          symbol: market.symbol.toUpperCase(),
          price: parseFloat(market.price),
          marketCap: parseFloat(market.marketCap),
          volume: parseFloat(market.volume),
          change: parseFloat(market.change),
          trend: market.trend || "", // Ensure it's always a string
        }));

        setMarkets(formattedData);
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    }

    fetchMarkets();
  }, []);

  return (
    <div className="flex flex-col items-center pt-16">
      <h1 className="text-2xl font-bold mb-6 text-white">Markets</h1>
      <div className="w-full max-w-6xl bg-black text-white rounded-lg p-4 shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-gray-300">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Market Cap</th>
              <th className="px-4 py-2 text-left">24h Volume</th>
              <th className="px-4 py-2 text-left">24h Change</th>
              <th className="px-4 py-2 text-left">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {markets.length > 0 ? (
              markets.map((market) => (
                <tr key={market.symbol} className="border-b border-gray-800">
                  <td className="px-4 py-2 flex items-center">
                    <span className="font-semibold">{market.name}</span>
                    <span className="text-gray-500 ml-2">{market.symbol}</span>
                  </td>
                  <td className="px-4 py-2">{market.price.toFixed(2)} USD</td>
                  <td className="px-4 py-2">{market.marketCap.toLocaleString()} USD</td>
                  <td className="px-4 py-2">{market.volume.toLocaleString()} USD</td>
                  <td
                    className={`px-4 py-2 ${
                      market.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {market.change.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2">
                    {/* Assuming trend is a chart or image URL */}
                    {market.trend ? (
                      <img src={market.trend} alt="7d trend" className="h-6" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Loading markets...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
