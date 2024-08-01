import { Validator, exceptionHandler } from "../middlewares";
import { RouterClass } from "../classes";
import { bonusOptionController } from "../controllers/bonusOptionController";

export class BonusOptionRouter extends RouterClass {
  constructor() {
    super();
  }

  define(): void {
    this.router.route("/").get(exceptionHandler(bonusOptionController.find));
  }
}
