import { Elysia } from "elysia";
import nhanvienRoutes from './routes/nhanviens';
import nganHangRoutes from './routes/nganhangs';
import { cors } from '@elysiajs/cors'
import express from 'express';
import path from 'path';

const server = new Elysia()
const client = express()

// const ClientScreenDisplay = 'BankScreen'
const ClientScreenDisplay = 'NhanVienScreen'


server
    .group('/api', (server) => server.use(nhanvienRoutes))
    .group('/api', (server) => server.use(nganHangRoutes))
    .use(cors())
    .listen(process.env.PORT_SERVER || 8080, () => {
      console.log(
        `🦊 WebServer is running at http://${server.server?.hostname}:${server.server?.port}`
      );
    })

client
    .use(express.static(path.join(__dirname + '/public')))
    .listen(process.env.PORT_CLIENT || 4000, () => {
      console.log(
        `🦊 WebClient is running at http://${server.server?.hostname}:${process.env.PORT_CLIENT}/${ClientScreenDisplay}.html`
      )
    }) 



    


