import { SocketProvider } from "@/providers/websocket";

export default function RootLayout({ children, params: { network } }: any) {
  return (
    <SocketProvider query={{ retail: 1, network }}>{children}</SocketProvider>
  );
}
