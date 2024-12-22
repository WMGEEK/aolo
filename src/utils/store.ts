/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface UserState {
    gptData: string[];
    setGptData: (data: string[]) => void;
    pool: any[];
}

export const useStore = create<UserState>(
    persist(
        (set) => ({
            pool: [{
                avatar: "/imgs/icon-content-avatar1.png",
                name: "CryptoStorm",
                tag: "Lively and excited",
            },
            {
                avatar: "/imgs/icon-content-avatar1.png",
                name: "CryptoStorm",
                tag: "Calm and serious",
            },
            {
                avatar: "/imgs/icon-content-avatar1.png",
                name: "CryptoStorm",
                tag: "Have a fine sense of humour",
            },],
            gptData: [],
            setGptData: (data: string[]) => set({ gptData: data })
        }),
        {
            name: 'gptData-storage', // 用于 localStorage 的键名
            getStorage: () => localStorage // 默认使用 localStorage
        } as PersistOptions<UserState> // 强制转换类型
    ) as any // 强制类型转换为 `any`
);
/* eslint-enable @typescript-eslint/no-explicit-any */