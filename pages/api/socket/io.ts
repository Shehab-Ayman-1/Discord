import type { NextApiResponseServerIO } from "@/types";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";

export const config = { api: { bodyParser: false } };

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
   if (!res.socket.server.io) {
      const httpServer: NetServer = res.socket.server as any;

      const io = new ServerIO(httpServer, { path: "/api/socket/io", addTrailingSlash: false });

      res.socket.server.io = io;
   }
   res.end();
};

export default ioHandler;
