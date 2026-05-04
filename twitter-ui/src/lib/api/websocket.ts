let cable: WebSocket | null = null;

export function connectToThread(
  threadId: string,
  token: string,
  onMessage: any
) {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  const hostname = import.meta.env.VITE_API_WS_HOSTNAME;
  const wsUrl = `${protocol}://${hostname}?token=${token}`;
  cable = new WebSocket(wsUrl);

  // subscribe to thread channel
  cable.onopen = () => {
    cable?.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "ChatThreadChannel",
          thread_id: threadId,
        }),
      })
    );
  };

  cable.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "ping" || !data.message) return;

    onMessage(data.message);
  };

  cable.onerror = (e) => console.error("Websocket error: ", e);
  cable.onclose = () => console.log("Websocket closed");
}

export function disconnect() {
  if (cable) cable.close();
}
