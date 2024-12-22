"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import {
  wallet,
  type EntryPosition,
} from "@particle-network/connectkit/wallet";
import { solana } from "@particle-network/connectkit/chains";
import { authWalletConnectors } from "@particle-network/connectkit/auth";

import {
  solanaWalletConnectors,
  injected as solaInjected,
} from "@particle-network/connectkit/solana";

import useResponsiveFontSize from "@/hooks/useResponsiveFontSize"; // 引入我们刚才创建的钩子

// 自定义 RPC 配置
const customSolana = {
  ...solana,
  rpcUrls: {
    default: {
      http: [
        "https://rpc.particle.network/solana?chainId=101&projectUuid=8e206794-46c1-4961-b9a1-ffb4e5b7f4a6&projectKey=crXmuAxoqz4U3nHpCndROG1MB7AT8K7X7sd2bYwM",
      ],
    },
  },
};

// const customSolanaDevnet = {
//   ...solanaDevnet,
//   rpcUrls: {
//     default: {
//       http: [
//         "https://rpc.particle.network/solana?chainId=103&projectUuid=8e206794-46c1-4961-b9a1-ffb4e5b7f4a6&projectKey=crXmuAxoqz4U3nHpCndROG1MB7AT8K7X7sd2bYwM",
//       ],
//     },
//   },
// };

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  appearance: {
    mode: "dark",
    recommendedWallets: [
      { walletId: "coinbaseWallet", label: "Popular" },
      { walletId: "okxWallet", label: "none" },
      { walletId: "phantom", label: "none" },
      { walletId: "trustWallet", label: "none" },
      { walletId: "bitKeep", label: "none" },
    ],
    theme: {
      "--pcm-font-family": "'Poppins', 'Poppins-Regular'",
      "--pcm-primary-button-bankground": "#0E0729",
      "--pcm-primary-button-color": "#fff",
      // "--pcm-rounded-lg": "100px",
      // "--pcm-body-background": "#0E0729",
      // "--pcm-body-color-secondary": "#fff",
    },
    splitEmailAndPhone: false,
    collapseWalletList: false,
    hideContinueButton: false,
    connectorsOrder: ["social", "wallet"],
    language: "en-US",
    collapsePasskeyButton: true,
  },
  walletConnectors: [
    authWalletConnectors({
      authTypes: [
        "google",
        "apple",
        "github",
        "facebook",
        "twitter",
        "microsoft",
        "discord",
        "twitch",
        "linkedin",
      ],
      fiatCoin: "USD",
      promptSettingConfig: {
        promptMasterPasswordSettingWhenLogin: 0,
        promptPaymentPasswordSettingWhenSign: 0,
      },
    }),

    solanaWalletConnectors({
      connectorFns: [
        solaInjected({ target: "coinbaseWallet" }),
        solaInjected({ target: "okxWallet" }),
        solaInjected({ target: "phantom" }),
        solaInjected({ target: "trustWallet" }),
        solaInjected({ target: "bitKeep" }),
      ],
    }),
  ],
  plugins: [
    wallet({
      entryPosition: "bottom-right" as EntryPosition,
      visible: false,
      customStyle: {
        fiatCoin: "USD",
      },
    }),
  ],
  chains: [customSolana],
});

// Wrap your application with this component.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  useResponsiveFontSize(); // 调用适配钩子
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
