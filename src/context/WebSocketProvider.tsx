import { Children, createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";

interface WebSocketContextType {
  alerts: string[];
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const clientRef = useRef<Client | null>(null);
  const userId = 3;

  useEffect(() => {
    if (!userId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-stomp'),
      onConnect: () => {
        console.log('WebSocket Connected!');

        client.subscribe(`/queue/user-${userId}`, (message) => {
          const newAlert = message.body;
          console.log('새로운 알림: ', newAlert);
          setAlerts(prevAlerts => [...prevAlerts, newAlert]);
        });
      },
      onStompError: (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
      debug: (str) => {
        console.log(new Date(), str);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        console.log('WebSocket Disconnected');
      }
    };
  }, [userId]);

  const value: WebSocketContextType = {
    alerts,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}