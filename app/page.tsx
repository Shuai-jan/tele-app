"use client";

import { useAccount } from "wagmi";
import { Web3Button } from '@web3modal/react';
import { W3mNetworkButton } from '@reown/appkit/react/components';
import { Suspense } from 'react';

interface HomeProps {}

export default function Home({}: HomeProps) {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen px-4 sm:px-8 py-0 pb-12 flex-1 flex flex-col items-center">
      <header className="w-full max-w-7xl py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/reown-logo.png" 
            alt="Reown Logo" 
            width={140}
            height={40}
            className="w-auto h-10 mr-2" 
          />
          <h1 className="hidden sm:inline text-xl font-bold">
            Telegram Mini App
          </h1>
        </div>
      </header>

      <section className="w-full max-w-4xl">
        <h2 className="my-8 text-2xl font-bold leading-snug text-center">
          Recovery
        </h2>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">
              Connect your wallet
            </h3>
            <div className="flex justify-center items-center p-4">
              <Suspense fallback={<div>Loading...</div>}>
                <Web3Button />
              </Suspense>
            </div>
          </div>

          {isConnected && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <h3 className="text-sm font-semibold bg-gray-100 p-2 text-center">
                Network selection
              </h3>
              <div className="flex justify-center items-center p-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <W3mNetworkButton />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
