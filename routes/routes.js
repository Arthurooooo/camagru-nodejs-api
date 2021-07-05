module.exports = (app) => {
    const userController = require("../controllers/userController.js")

    app.get("/", userController.GetHome);
    app.get("/api/users", userController.GetUser);
    app.post("/api/users", userController.postUser);
    app.put("/api/users/:id", userController.GetUserId);
}