import Express from "express";
import cors from "cors";
import router from './router';
import db from "./config/database";

const server = Express();

server.use(cors({
  origin: "http://localhost:5173" // o "*" para todos, solo en dev
}));

server.use(Express.json());

// Conectar BD
async function conecBD() {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Conexión exitosa a la BD');
  } catch (error) {
    console.log('No se pudo conectar a la BD');
    console.log(error);
  }
}
conecBD();

server.use('/api', router);

export default server;