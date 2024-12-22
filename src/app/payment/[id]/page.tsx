"use client";
import "./page.scss";
import Image from "next/image";
import { useStore } from "@/utils/store";
import { useParams, useRouter } from "next/navigation";
import { notification } from "antd";
import { useEffect, useState } from "react";

import {
  useAccount,
  type SolanaChain,
  useWallets,
  usePublicClient,
} from "@particle-network/connectkit";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export default function Payment() {
  const [id, setId] = useState(0);
  const pool = useStore((state) => state.pool);
  const gptData = useStore((state) => state.gptData);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setId(Number(params.id));
  }, [params.id]);

  const handleTwitter = async () => {
    try {
      // 定义参数对象
      const params = { content: gptData[Number(id)] };

      // 将 params 转换为查询字符串
      const queryString = new URLSearchParams(params).toString();

      // 发起 GET 请求
      const res = await fetch(`/api/postToTwitter?${queryString}`, {
        method: "GET",
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/check/${id}`);
      } else {
        notification.error({
          message: `Publication Failed`,
          description: data.error,
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: `Publication Failed`,
        description: error + "",
        placement: "topRight",
      });
    }
  };

  const { isConnected } = useAccount();
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient<SolanaChain>();
  const solanaWallet = primaryWallet?.getWalletClient<SolanaChain>();
  const recipientAddress = "45CK96gxTx8rBxywTL7GRv2LoyWXRrEGn19Uw9GHiBi4";

  const executeTx = async () => {
    try {
      const publicKey = solanaWallet.publicKey;

      // Prepare the transaction object
      const tx = new Transaction();
      tx.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: 0.1 * LAMPORTS_PER_SOL, // Convert 0.1 SOL to lamports
        })
      );

      if (publicClient) {
        const { blockhash, lastValidBlockHeight } =
          await publicClient.getLatestBlockhash({
            commitment: "finalized",
          });

        tx.recentBlockhash = blockhash;
        tx.lastValidBlockHeight = lastValidBlockHeight;
        tx.feePayer = publicKey;

        const transactionResponse = await solanaWallet.sendTransaction(tx);
        console.log("Transaction sent:", transactionResponse);

        notification.success({
          message: `Success to execute transaction`,
          description: "Connect Wallet",
          placement: "topRight",
        });
        handleTwitter();
      } else {
        notification.error({
          message: `Failed to execute transaction`,
          description: "Connect Wallet",
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: `Failed to execute transaction`,
        description: error + "",
        placement: "topRight",
      });
    }
  };

  const fetchBalance = async () => {
    if (isConnected && solanaWallet && publicClient) {
      try {
        const balanceResponse = await publicClient.getBalance(
          solanaWallet.publicKey
        );

        const balanceInSol = balanceResponse / LAMPORTS_PER_SOL;

        if (balanceInSol >= 0.1) {
          console.log("balance:", balanceInSol);
          executeTx();
        } else {
          notification.error({
            message: `Failed to execute transaction`,
            description: "balance < 0.1",
            placement: "topRight",
          });
        }
      } catch (error) {
        notification.error({
          message: `Failed to fetch balance`,
          description: error + "",
          placement: "topRight",
        });
      }
    }
  };

  const handleClick = async () => {
    if (!isConnected) {
      notification.error({
        message: `Failed to execute transaction`,
        description: "Connect Wallet",
        placement: "topRight",
      });
    } else {
      fetchBalance();
    }
  };

  return (
    <div className="PaymentU">
      <div className="titleU">ready to go！</div>
      <div className="listU">
        <div className="itemU active">
          <div className="boxT">
            <Image
              className="avatarU"
              src={pool[Number(id)]?.avatar}
              alt="image"
              width={500}
              height={500}
            />
            <div className="boxR">
              <div className="nameU">
                <span>{pool[Number(id)]?.name}</span>
                <svg
                  className="iconU"
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                >
                  <path
                    d="M8.7279 20.625L6.98623 17.6917L3.68623 16.9583L4.00706 13.5667L1.76123 11L4.00706 8.43333L3.68623 5.04167L6.98623 4.30833L8.7279 1.375L11.8446 2.70417L14.9612 1.375L16.7029 4.30833L20.0029 5.04167L19.6821 8.43333L21.9279 11L19.6821 13.5667L20.0029 16.9583L16.7029 17.6917L14.9612 20.625L11.8446 19.2958L8.7279 20.625ZM10.8821 14.2542L16.0612 9.075L14.7779 7.74583L10.8821 11.6417L8.91123 9.71667L7.6279 11L10.8821 14.2542Z"
                    fill="#459BEB"
                  />
                </svg>
              </div>
              {/* <div className="tagU">{pool[Number(id)].tag}</div> */}
            </div>
          </div>
          <div className="boxB">{gptData[Number(id)]}</div>
        </div>
      </div>
      <div onClick={handleClick} className="btnU">
        PLACE THE ORDER
      </div>
    </div>
  );
}
