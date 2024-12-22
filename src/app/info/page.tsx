"use client";
import "./page.scss";
import { message } from "antd";
import { useState } from "react";
import { useStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import Generation from "@/components/generation";

export default function Info() {
  const dataPool: string[] = [];
  const router = useRouter();
  const setGptData = useStore((state) => state.setGptData);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    projectIntro: "",
    topic: "",
    reasonToBelieve: "",
    contentFocus: "",
    scenarioExpansion: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const hasEmptyField = Object.values(formData).some(
      (value) => !value.trim()
    );

    if (hasEmptyField) {
      message.error("Prohibited from being empty");
      return false;
    }

    if (isLoading) return;
    setIsLoading(true);

    setGptData([]);
    createGpt("fortuneTelling1");
    createGpt("fortuneTelling2");
    createGpt("fortuneTelling3");
  };

  const createGpt = async (path: string) => {
    try {
      const response = await fetch("/api/" + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        dataPool.push(data.report);
      } else {
        console.log(data.error);
      }

      if (dataPool.length === 3) {
        setGptData(dataPool);
        router.push("/content");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch data:", error.message);
      }
    }
  };

  return (
    <div className="InfoU">
      <div className="popupU">
        <div className="titleU">SPECIFY THE REQUIREMENTS</div>
        <form className="formU" onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="groupU">
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

          {/* Project Intro */}
          <div className="groupU">
            <label>
              project intro (describe your project in short sentences)
            </label>
            <input
              type="text"
              name="projectIntro"
              value={formData.projectIntro}
              onChange={handleChange}
            />
          </div>

          {/* Topic */}
          <div className="groupU">
            <label>
              topic (eg: branding narrative; airdrop campaign, fundraising,
              product launch, etc)
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            />
          </div>

          {/* Reason to Believe */}
          <div className="groupU">
            <label>
              reason to believe (eg: promising market; low cost high reward;
              strong backers; niche product features, etc)
            </label>
            <input
              type="text"
              name="reasonToBelieve"
              value={formData.reasonToBelieve}
              onChange={handleChange}
            />
          </div>

          {/* Content Focus */}
          <div className="groupU">
            <label>
              content focus (describe what specific aspect you want KOLs to
              emphasize)
            </label>
            <textarea
              name="contentFocus"
              value={formData.contentFocus}
              onChange={handleChange}
              placeholder=""
            />
          </div>

          {/* Scenario Expansion */}
          <div className="groupU">
            <label>
              Scenario Expansion (describe what examples you want KOLs to
              expand)
            </label>
            <textarea
              name="scenarioExpansion"
              value={formData.scenarioExpansion}
              onChange={handleChange}
              placeholder=""
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btnU">
            NEXT
          </button>
        </form>
      </div>
      <div
        className={`${isLoading ? "" : "hidden"} fixed top-0 left-0 size-full`}
      >
        <Generation />
      </div>
    </div>
  );
}
