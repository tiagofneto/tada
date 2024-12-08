'use client'

import { useState } from 'react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { Button } from './ui/button';

interface ReclaimDemoProps {
  onSuccess: (contributions: { contributions: string | undefined; followers: string | undefined }) => void;
}

function ReclaimDemo({ onSuccess }: ReclaimDemoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [requestUrl, setRequestUrl] = useState('');

  const getVerificationReq = async () => {
    setIsLoading(true);
    try {
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
      const url = await reclaimProofRequest.getRequestUrl();
      setRequestUrl(url);
      
      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          if (proofs && typeof proofs !== 'string') {
            console.log(proofs);
            const contributionsData = {
              contributions: proofs.publicData?.contributionsLastYear,
              followers: proofs.publicData?.followers,
            };
            onSuccess(contributionsData);
          }
        },
        onError: (error) => {
          console.error('Verification failed', error);
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };
 
  return (
    <div className="flex flex-col items-center gap-4">
      {!requestUrl ? (
        <Button
          onClick={getVerificationReq}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            'Prove GitHub contributions'
          )}
        </Button>
      ) : (
        <Button
          onClick={() => window.open(requestUrl, '_blank')}
        >
          Continue to GitHub
        </Button>
      )}
    </div>
  );
}
 
export default ReclaimDemo;
