"use client";
import "./page.scss";
import Link from "next/link";
import { ConnectButton, useAccount } from "@particle-network/connectkit";

export default function Home() {
  const { isConnected } = useAccount();
  // 获取 Solana 钱包客户端

  return (
    <div className="HomeU">
      <div className="textU">
        The Future of
        <span>AI Agent KOL</span>
        Marketing Starts Here
      </div>

      {isConnected ? (
        <Link className="btnU" href="/kol">
          LFG
        </Link>
      ) : (
        <div className="relative size-max overflow-hidden">
          <div className="btnU">LFG</div>
          <div className="size-full absolute top-0 left-0 scale-[2] opacity-0">
            <ConnectButton label="Connect Wallet" />
          </div>
        </div>
      )}
    </div>
  );
}
