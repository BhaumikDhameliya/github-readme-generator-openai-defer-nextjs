"use client";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import "./page.css";

export default function Home() {
  const [userName, setUserName] = useState<string>("");
  const [callAPI, setCallAPI] = useState(false);

  // const [executionId, setExecutionId] = useState<string | null>();
  // const { mutate } = useMutation(
  //   async () => {
  //     const req = await fetch(`/api/githubProfile/${userName}`, {
  //       method: "POST",
  //     });
  //     return await req.json();
  //   },
  //   {
  //     onSuccess: ({ id }) => {
  //       setExecutionId(id);
  //     },
  //   }
  // );

  // const { data } = useQuery(
  //   "queryJobStatus",
  //   async () => {
  //     const req = await fetch(`/api/githubProfile/${executionId}`, {});
  //     return await req.json();
  //   },
  //   {
  //     enabled: !!executionId,
  //     refetchInterval: 1000,
  //     onSuccess: (data) => {
  //       if (data.result || data.state === "cancelled") {
  //         setExecutionId(null);
  //       }
  //     },
  //   }
  // );

  const { isLoading, error, data } = useQuery(
    "queryJobStatus",
    async () => {
      const req = await fetch(`/api/githubProfile/${userName.trim()}`, {
        method: "POST",
      });
      return await req.json();
    },
    {
      enabled: callAPI,
      onSuccess: (data) => {
        setCallAPI(false);
      },
    }
  );

  // const hasStarted = data?.state === "started" || data?.state === "created";

  return (
    <main className="container">
      <h1>GitHub README AI Generator</h1>
      <p>Let OpenAI generate a personalized GitHub Profile README for you</p>
      <div className="name">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input"
          placeholder="Enter your GitHub username"
          disabled={isLoading}
        />
        <button
          onClick={() => setCallAPI(true)}
          className="buttonPrimary"
          disabled={isLoading}
        >
          {isLoading ? "Generating ..." : "Generate"}
        </button>
      </div>
      {data && (
        <div className="result codeblock-container">
          <div className="codeblock-content">{data}</div>
        </div>
      )}
      {isLoading && (
        <div className="image-container">
          <Image
            src="/generating.gif"
            alt="generating your GitHub readme"
            width={300}
            height={300}
          />
        </div>
      )}
    </main>
  );
}
