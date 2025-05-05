
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock function for blockchain interaction
async function sendToBlockchain(data: any, hash: string, hospitalId: string, txType: string) {
  // In a real implementation, this would connect to Ethereum
  // For now, we'll simulate a blockchain transaction
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a mock transaction hash
  const mockTxHash = `0x${Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
  return {
    success: true,
    txHash: mockTxHash,
    timestamp: new Date().toISOString(),
    blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
    confirmations: 1
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  
  if (req.method === 'POST') {
    try {
      const payload = await req.json();
      const { data, hash, hospitalId, txType } = payload;
      
      if (!data || !hash || !hospitalId || !txType) {
        return new Response(
          JSON.stringify({ 
            error: "Missing required fields. Please provide data, hash, hospitalId, and txType." 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
            status: 400 
          }
        );
      }
      
      // Send data to blockchain (mocked)
      const result = await sendToBlockchain(data, hash, hospitalId, txType);
      
      return new Response(
        JSON.stringify(result),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 200 
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message || "Internal server error" }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 500 
        }
      );
    }
  }
  
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
      status: 405 
    }
  );
});
