import { Validator, exceptionHandler } from "../middlewares";
import { RouterClass } from "../classes";
import { depositController } from "../controllers/depositController";
import { AuthorizationMiddleware } from "../middlewares";

export class DepositAndBonusRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/")
      .get(AuthorizationMiddleware, exceptionHandler(depositController.find));
    this.router
      .route("/")
      .post(
        AuthorizationMiddleware,
        exceptionHandler(depositController.create)
      );
    this.router
      .route("/:id")
      .put(AuthorizationMiddleware, exceptionHandler(depositController.update));
    this.router
      .route("/:id")
      .post(
        AuthorizationMiddleware,
        exceptionHandler(depositController.findByPk)
      );
  }
}
