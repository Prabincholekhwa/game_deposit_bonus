import { Validator, exceptionHandler } from "../middlewares";
import { RouterClass } from "../classes";
import { userController } from "../controllers";
import { createUser, loginUser } from "../validators";
import { AuthorizationMiddleware } from "../middlewares";

export class UserRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router
      .route("/")
      .post(
        Validator.check(createUser),
        exceptionHandler(userController.create)
      );
    this.router
      .route("/login")
      .post(Validator.check(loginUser), exceptionHandler(userController.login));

    this.router
      .route("/profile")
      .get(
        AuthorizationMiddleware,
        exceptionHandler(userController.getProfile)
      );
  }
}
