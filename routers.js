const Router = require("./structures/router.js");
const mainRouter = Router("/")
const apiRouter = Router("/api")
const mainRouterController = require("./controlers/MainRouterController.js")
const apiRouterController = require("./controlers/ApiRouterController.js");
const rateLimit = require("express-rate-limit");

const createAccountLimiter = rateLimit({
    windowMs: 60 * 30 * 1000,
    max: 50,
});

apiRouter.get("/login", apiRouterController("/login"))
apiRouter.get("/logout", apiRouterController("/logout"))
apiRouter.post("/users", createAccountLimiter, apiRouterController("/users"))


mainRouter.get("/", mainRouterController("/"))
mainRouter.get("/novidades", mainRouterController("/novidades"))
mainRouter.get("/users", mainRouterController("/usuarios"))
mainRouter.get("/user/:id", mainRouterController("/user/id"))

module.exports = [
    mainRouter,
    apiRouter
]