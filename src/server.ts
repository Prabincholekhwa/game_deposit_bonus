import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import http from "http";
import { corsWhitelist } from "./config";
import { Database } from "./models/instance";
import { ProxyRouter as ProxyRouterPublic } from "./routes";

class App {
  private app: Application;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.configuration();
  }

  private configuration() {
    this.app.set("port", process.env.PORT);
    this.app.use(express.json());
    this.app.use(cors(this.corsOptions));
    this.app.use("/api/v1", ProxyRouterPublic.map());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  };

  private async connectDB() {
    await Database.connection();
    await Database.sequelize.sync({ alter: true });
  }

  public Start() {
    this.connectDB();
    this.server.listen(this.app.get("port"));
    console.log(`Server listening on port ${this.app.get("port")}.`);
  }
}

new App().Start();
