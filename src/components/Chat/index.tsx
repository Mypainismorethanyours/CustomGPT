import React, { useEffect, useState } from "react";
import * as chatStorage from "@/utils/chatStorage";
import { Message } from "@/components/Message";
import { Session } from "../Session";
import { MediaQuery } from "@mantine/core";
import { notifications } from "@mantine/notifications";
const showNotification = (message: string, type: string) => {
  notifications.show({
    id: type,
    title: type,
    message,
    color: type === 'Success' ? "green" : 'red',
    autoClose: 3000,
  });
};
export const Chat = () => {
  const [sessionId, setSessionId] = useState<string>("");
  useEffect(() => {
    const init = () => {

      const apiKey = JSON.parse(window.localStorage.getItem("OPENAI_API_KEY") || "{}")?.value
      if (!apiKey) {
        showNotification("Please set the API Key first.", "Error")
        //@ts-ignore
        return setTimeout(() => {
          window.location.href = "./openAIKey"
        }, 1000)
      }
        const list = chatStorage.getSessionStore();
        const id = list[0].id;
        setSessionId(id);
      };
      init();
    }, []);

  return (
    <div className="h-screen flex w-screen">
      <MediaQuery
        smallerThan="md"
        styles={{
          width: "0 !important",
          padding: "0 !important",
          overflow: "hidden",
        }}
      >
        <Session sessionId={sessionId} onChange={setSessionId}></Session>
      </MediaQuery>
      <Message sessionId={sessionId}></Message>
    </div>
  );
};
