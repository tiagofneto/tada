'use client'

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Proof, ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
 
function ReclaimDemo() {

  // State to store the verification request URL
  const [requestUrl, setRequestUrl] = useState('');
  //const [proofs, setProofs] = useState<Proof | string[]>();
  const [username, setUsername] = useState('');

  const getVerificationReq = async () => {

    // Your credentials from the Reclaim Developer Portal
    // Replace these with your actual credentials

    const APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID;
    const APP_SECRET = process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET;
    const PROVIDER_ID = process.env.NEXT_PUBLIC_RECLAIM_PROVIDER_ID;
 
    // Ensure credentials are defined
    if (!APP_ID || !APP_SECRET || !PROVIDER_ID) {
        throw new Error('Missing Reclaim credentials');
    }
 
    // Initialize the Reclaim SDK with your credentials
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
 
    // Generate the verification request URL
    const requestUrl = await reclaimProofRequest.getRequestUrl();

    console.log('Request URL:', requestUrl);

    setRequestUrl(requestUrl);
 
    // Start listening for proof submissions
    await reclaimProofRequest.startSession({
      // Called when the user successfully completes the verification
      onSuccess: (proofs) => {
        if (proofs) {
            if (typeof proofs === 'string') {
              // When using a custom callback url, the proof is returned to the callback url and we get a message instead of a proof
              console.log('SDK Message:', proofs);
              //setProofs([proofs]);
            } else if (typeof proofs !== 'string') {
              // When using the default callback url, we get a proof object in the response
              console.log(proofs);
              //setProofs(proofs);
              setUsername(JSON.parse(proofs?.claimData.context).extractedParameters.username);
            }
          }

        // Add your success logic here, such as:
        // - Updating UI to show verification success
        // - Storing verification status
        // - Redirecting to another page
      },
      // Called if there's an error during verification
      onError: (error) => {

        console.error('Verification failed', error);
 
        // Add your error handling logic here, such as:
        // - Showing error message to user
        // - Resetting verification state
        // - Offering retry options
      },
    });
  };
 
  return (
    <>
      {username ? (
        <div>
          <p>Username: {username}</p>
        </div>
      ) : (
        <>
          <button 
            onClick={getVerificationReq}
            className="flex items-center justify-center bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-200"
          >
            Get Verification Request
          </button>

          {/* Display QR code when URL is available */}
          {requestUrl && (
            <div style={{ margin: '20px 0' }}>
              <QRCode value={requestUrl} />
            </div>
          )}
        </>
      )}
    </>
  );
}
 
export default ReclaimDemo;
