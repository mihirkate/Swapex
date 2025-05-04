"use client";

import React, { useEffect, useState } from "react";

function Page() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://exchange-proxy-mihir.work-mihirkate.workers.dev/api/v1/assets");
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();
        setAssets(data); // Assuming data is an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }  

    fetchData();
  }, []);

  return (
    <div>
      <h1>Assets Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {assets.map((asset, index) => (
            <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <h2>{asset.symbol}</h2>
              {asset.tokens.map((token, tokenIndex) => (
                <div key={tokenIndex} style={{ marginLeft: "20px", borderLeft: "3px solid #007bff", paddingLeft: "10px" }}>
                  <p><strong>Blockchain:</strong> {token.blockchain}</p>
                  <p><strong>Contract Address:</strong> {token.contractAddress}</p>
                  <p><strong>Deposit Enabled:</strong> {token.depositEnabled ? "Yes" : "No"}</p>
                  <p><strong>Withdraw Enabled:</strong> {token.withdrawEnabled ? "Yes" : "No"}</p>
                  <p><strong>Min Deposit:</strong> {token.minimumDeposit}</p>
                  <p><strong>Min Withdrawal:</strong> {token.minimumWithdrawal}</p>
                  <p><strong>Max Withdrawal:</strong> {token.maximumWithdrawal || "N/A"}</p>
                  <p><strong>Withdrawal Fee:</strong> {token.withdrawalFee}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
