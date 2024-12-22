"use client";
import "./page.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useStore } from "@/utils/store";

export default function Content() {
  const pool = useStore((state) => state.pool);
  const gptData = useStore((state) => state.gptData);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="ContentU">
      <div className="titleU">Select the Best One</div>
      <div className="listU">
        {pool.map((item, index) => (
          <div
            onClick={() => setActiveIdx(index)}
            className={`itemU ${index === activeIdx ? "active" : ""}`}
            key={index}
          >
            <div className="boxT">
              <Image
                className="avatarU"
                src={item.avatar}
                alt="image"
                width={500}
                height={500}
              />
              <div className="boxR">
                <div className="nameU">
                  <span>{item.name}</span>
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
                {/* <div className="tagU">{item.tag}</div> */}
              </div>
            </div>
            <div className="boxB">{gptData[index] || ""}</div>
          </div>
        ))}
      </div>
      <div className="btnU">
        <Link className="btnL" href="/info">
          TRY AGAIN
        </Link>
        <Link className="btnR" href={`/payment/${activeIdx}`}>
          NEXT
        </Link>
      </div>
    </div>
  );
}
