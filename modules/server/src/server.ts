import express from 'express';
import cors from 'cors';
import * as http from "node:http";

const server = express();

// Enable CORS for all origins
server.use(cors());

// Define a route
server.get('/hello', (req, res) => {
    res.json({message: 'Hello, World!'});
});
export const httpServer = http.createServer(server);
