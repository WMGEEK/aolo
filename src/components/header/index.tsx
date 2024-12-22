"use client";

import "./index.scss";
import Image from "next/image";

import { ConnectButton } from "@particle-network/connectkit";

export default function Header() {
  return (
    <div className="headerU">
      <Image
        className="logoU"
        src="/imgs/logo.png"
        alt="image"
        width={500}
        height={500}
      />

      <ConnectButton label="Connect Wallet" />
      {/* { view: "Networks" } */}
      {/* {isConnected ? (
        <div
          className="btnU uppercase"
          onClick={() => open({ view: "Account" })}
        >
          <Image
            className="iconU"
            src="/imgs/icon-wallet.png"
            alt="image"
            width={500}
            height={500}
          />
          {truncateString(address)}
        </div>
      ) : (
        <div className="btnU" onClick={() => open()}>
          Connect Wallet
        </div>
      )} */}
    </div>
  );
}
