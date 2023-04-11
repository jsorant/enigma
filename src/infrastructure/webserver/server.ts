import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Encrypt } from "../../domain/usecase/Encrypt";
import {
  StoreSecurityModel,
  StoreSecurityModelInput,
} from "../../domain/usecase/StoreSecurityModel";

export class Server {
  readonly expressApplication: express.Application;
  private readonly storeSecurityModel: StoreSecurityModel;
  private readonly encrypt: Encrypt;

  constructor(storeSecurityModel: StoreSecurityModel, encrypt: Encrypt) {
    this.expressApplication = express();
    this.storeSecurityModel = storeSecurityModel;
    this.encrypt = encrypt;

    // load middlewares
    this.expressApplication.use(bodyParser.urlencoded({ extended: true }));
    this.expressApplication.use(bodyParser.json());

    // load routes
    const router = this.makeRouter(this.storeSecurityModel, this.encrypt);
    this.expressApplication.use("/", router);

    // generic error handler
    //this.expressApplication.use(ErrorHandler);
  }

  makeRouter(storeSecurityModel: StoreSecurityModel, encrypt: Encrypt) {
    const router = express.Router();

    router.post(
      "/security-model",
      async function (req: Request, res: Response) {
        const input: StoreSecurityModelInput = {
          name: req.body.name,
          engines: req.body.engines.map((element: any) => {
            if (element.name === "caesar") {
              return {
                name: "caesar",
                shift: element.shift,
                increment: element.increment,
              };
            } else if (element.name === "rotor") {
              return {
                name: "rotor",
                rotor: element.rotor,
              };
            }
          }),
        };
        await storeSecurityModel.execute(input);
        res.status(200).json({});
      }
    );

    router.post("/encrypt", async function (req: Request, res: Response) {
      const securityModelName: string = req.body.security_model_name;
      const message: string = req.body.message;
      const encryptedMessage = await encrypt.execute(
        securityModelName,
        message
      );
      const response = {
        encrypted_message: encryptedMessage,
      };
      res.status(200).json(response);
    });

    return router;
  }

  start(port: number): void {
    this.expressApplication.listen(port, () => {
      return console.log(`server is listening on ${port}`);
    });
  }
}
