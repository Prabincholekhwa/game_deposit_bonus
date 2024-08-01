import { Router } from "express";
import { IRouteInterface } from "../interfaces";
import { UserRouter } from "./userRoute";
import { BonusOptionRouter } from "./bonusOptionRoute";
import { DepositAndBonusRouter } from "./depositAndBonusRoute";

class ProxyRouter {
  private static instance: ProxyRouter;
  private router: Router = Router();
  private readonly routes = [
    { segment: "/user", provider: UserRouter },
    { segment: "/bonus-option", provider: BonusOptionRouter },
    { segment: "/deposit-bonus", provider: DepositAndBonusRouter },
  ];

  private constructor() {}

  static get(): ProxyRouter {
    if (!ProxyRouter.instance) {
      ProxyRouter.instance = new ProxyRouter();
    }
    return ProxyRouter.instance;
  }

  map(): Router {
    this.routes.forEach((route: IRouteInterface) => {
      const instance = new route.provider() as { router: Router };
      this.router.use(route.segment, instance.router);
    });
    return this.router;
  }
}

const proxyRouter = ProxyRouter.get();

export { proxyRouter as ProxyRouter };
