"use client";
import "./page.scss";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/utils/store";

export default function Kol() {
  const pool = useStore((state) => state.pool);

  return (
    <div className="KolU">
      <div className="titleU">Select the AI Agent KOL</div>
      <div className="listU">
        <div className="itemU">
          <div className="boxT">
            <div className="avatarB">
              <Image
                className="avatarU"
                src={pool[0].avatar}
                alt="image"
                width={500}
                height={500}
              />
            </div>
            <div className="nameU">{pool[0].name}</div>
          </div>
          <div className="boxB">
            <Image
              className="iconU"
              src="/imgs/icon-kol.png"
              alt="image"
              width={500}
              height={500}
            />
            <div className="priceU">0.1 SOL/Post</div>
          </div>
        </div>
      </div>
      <Link className="btnU" href="/info">
        NEXT
      </Link>
    </div>
  );
}
