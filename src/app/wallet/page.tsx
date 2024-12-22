"use client";

import {
  ConnectButton,
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
import { useEffect, useState } from "react";

const Wallet = () => {
  // 获取当前连接的钱包地址、连接状态和链 ID
  const { address, isConnected, chainId, chain } = useAccount();
  const publicClient = usePublicClient<SolanaChain>(); // 获取 Solana 链的公用客户端
  const [primaryWallet] = useWallets(); // 获取主要钱包
  const solanaWallet = primaryWallet?.getWalletClient<SolanaChain>(); // 获取 Solana 钱包客户端

  // 状态管理：余额、接收地址和交易签名
  const [balance, setBalance] = useState<number | null>(null); // 用户余额
  const [recipientAddress, setRecipientAddress] = useState<string>(
    "45CK96gxTx8rBxywTL7GRv2LoyWXRrEGn19Uw9GHiBi4" // 默认接收地址
  );
  const [transactionSignature, setTransactionSignature] = useState<
    string | null
  >(null); // 交易签名

  // 获取用户余额的方法
  const fetchBalance = async () => {
    if (isConnected && solanaWallet && publicClient) {
      try {
        // 从 publicClient 获取钱包的余额（以 lamports 为单位）
        const balanceResponse = await publicClient.getBalance(
          solanaWallet.publicKey
        );

        // 将 lamports 转换为 SOL（1 SOL = 10^9 lamports）
        const balanceInSol = balanceResponse / LAMPORTS_PER_SOL;
        setBalance(balanceInSol); // 更新余额状态
      } catch (error) {
        console.error("Failed to fetch balance:", error); // 捕获并输出错误信息
      }
    }
  };

  // 在组件加载时或依赖变化时调用 fetchBalance
  useEffect(() => {
    fetchBalance();
  }, [isConnected, solanaWallet, publicClient, chainId, fetchBalance]);

  const executeTx = async () => {
    try {
      if (!solanaWallet || !address || !publicClient) {
        console.error("Wallet not connected or address not available.");
        return;
      }

      const senderPubkey = new PublicKey(address); // 发送方公钥
      const recipientPubkey = new PublicKey(recipientAddress); // 接收方公钥

      const recipientAccountInfo =
        await publicClient.getAccountInfo(recipientPubkey);
      const tx = new Transaction();

      // 如果接收方账户不存在，创建一个接收方账户
      if (!recipientAccountInfo) {
        const rentExemptionLamports =
          await publicClient.getMinimumBalanceForRentExemption(0);
        tx.add(
          SystemProgram.createAccount({
            fromPubkey: senderPubkey,
            newAccountPubkey: recipientPubkey,
            lamports: rentExemptionLamports,
            space: 0,
            programId: SystemProgram.programId,
          })
        );
      }

      const amountToSend = 0.00001; // 转账金额
      tx.add(
        SystemProgram.transfer({
          fromPubkey: senderPubkey,
          toPubkey: recipientPubkey,
          lamports: amountToSend * LAMPORTS_PER_SOL,
        })
      );

      // 获取最新的区块哈希和区块高度
      const { blockhash, lastValidBlockHeight } =
        await publicClient.getLatestBlockhash({
          commitment: "finalized",
        });

      tx.recentBlockhash = blockhash; // 设置交易的区块哈希
      tx.lastValidBlockHeight = lastValidBlockHeight; // 设置交易的最后有效区块高度
      tx.feePayer = senderPubkey; // 设置交易费用支付方

      // 签署交易并发送
      const signedTx = await solanaWallet.signTransaction(tx);
      const txid = await publicClient.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: "finalized",
      });

      console.log("Transaction sent! Txid:", txid);
      setTransactionSignature(txid); // 设置交易签名
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Transaction failed:", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <ConnectButton /> {/* 连接钱包按钮 */}
        {isConnected && ( // 如果钱包已连接，显示以下内容
          <>
            <h2 className="mt-4">Address: {address}</h2> {/* 显示钱包地址 */}
            <h2>Chain ID: {chainId}</h2> {/* 显示链 ID */}
            {balance !== null && (
              <div className="flex items-center justify-center space-x-2 mt-4">
                <h2>
                  Balance: {balance} {chain?.nativeCurrency.symbol}{" "}
                  {/* 显示余额 */}
                </h2>
                {/* 刷新余额按钮 */}
                <button
                  onClick={fetchBalance}
                  className="bg-purple-500 text-white p-2 rounded"
                >
                  🔄
                </button>
              </div>
            )}
            {/* 输入接收地址 */}
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="border border-gray-300 rounded p-2 mt-4 w-full text-black"
            />
            {/* 执行交易按钮 */}
            <button
              onClick={executeTx}
              className="bg-purple-500 text-white p-2 rounded mt-4 w-full"
            >
              Send 0.00001 {chain?.nativeCurrency.symbol}
            </button>
            {/* 显示交易签名 */}
            {transactionSignature && (
              <div className="mt-4">
                <h2>Transaction Signature:</h2>
                <p className="break-words text-blue-500">
                  {transactionSignature}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
