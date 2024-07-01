import { Message } from "@/types";
type StreamParams = {
  prompt: string;
  history?: Message[];
  options?: {
    temperature?: number;
    max_tokens?: number;
  };
  apiKey?: string;
  gptVersion?: string;
};
type Actions = {
  onCompleting: (sug: string) => void;
  onCompleted?: (sug: string) => void;
};

class ChatService {
  private controller: AbortController;
  private static instance: ChatService;
  public actions?: Actions;

  private constructor() {
    this.controller = new AbortController();
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }
  public async getStream(params: StreamParams) {
    const { prompt, history = [], options = {} } = params;
    let suggestion = "";
    const OPENAI_API_KEY =
      JSON.parse(window.localStorage.getItem("OPENAI_API_KEY") || "{}")
        ?.value || null;
   
    const gptVersion =
     //@ts-ignore
      JSON.parse(window.localStorage.getItem("gptVersion")) || "gpt-3.5-turbo";
    console.log(gptVersion, "11111122");
    try {
      const response = await fetch("/api/chat", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          prompt,
          history,
          options,
          apiKey: OPENAI_API_KEY,
          gptVersion,
        }),
        signal: this.controller.signal,
      });
      const data = response.body;
      if (!data) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      while (!done) {
        const { value, done: doneReadingStream } = await reader.read();
        done = doneReadingStream;
        const chunkValue = decoder.decode(value);
        suggestion += chunkValue;
        this.actions?.onCompleting(suggestion);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
    } finally {
      this.actions?.onCompleted?.(suggestion);
      this.controller = new AbortController();
    }
  }
  public cancel() {
    this.controller.abort();
  }
}

const chatService = ChatService.getInstance();

export default chatService;
