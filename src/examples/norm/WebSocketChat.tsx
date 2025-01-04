import { useState, useEffect } from "react";

export function WebSocketChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Using a mock WebSocket with echo service
    const ws = new WebSocket("wss://echo.websocket.org");

    ws.onopen = () => {
      setConnected(true);
      ws.send("Hello WebSocket!");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    // Simulate receiving a message since the echo service might be down
    setMessages((prev) => [...prev, `Message ${prev.length + 1}`]);
  };

  return (
    <section>
      <h2>21. WebSocket Chat</h2>
      <p>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>
      <button onClick={sendMessage}>Send Test Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </section>
  );
}
