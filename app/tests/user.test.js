const userController = require("../controllers/users");
const userService = require("../services/users");
const httpMocks = require("node-mocks-http");

jest.mock("../services/users");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should return created user", async () => {
      req.body = { username: "testuser", password: "testpass" };
      const mockUser = { id: "1", username: "testuser" };
      userService.create.mockResolvedValue(mockUser);

      await userController.create(req, res);

      expect(userService.create).toHaveBeenCalledWith("testuser", "testpass");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockUser);
    });

    it("should handle errors", async () => {
      req.body = { username: "testuser", password: "testpass" };
      const error = { message: "Validation error" };
      userService.create.mockRejectedValue(error);

      await userController.create(req, res);

      expect(res.statusCode).toBe(422);
      expect(res._getJSONData()).toEqual(error);
    });
  });

  describe("read", () => {
    it("should return a user if found", async () => {
      req.params.id = "1";
      const mockUser = { id: "1", username: "testuser" };
      userService.readUserById.mockResolvedValue(mockUser);

      await userController.read(req, res);

      expect(userService.readUserById).toHaveBeenCalledWith("1");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockUser);
    });

    it("should return 404 if user is not found", async () => {
      req.params.id = "1";
      userService.readUserById.mockResolvedValue(null);

      await userController.read(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toBe("User not found");
    });
  });

  describe("update", () => {
    it("should update user and return updated data", async () => {
      req.params.id = "1";
      req.body = { username: "updateduser" };
      const updatedUser = { id: "1", username: "updateduser" };
      userService.update.mockResolvedValue(updatedUser);

      await userController.update(req, res);

      expect(userService.update).toHaveBeenCalledWith("1", {
        username: "updateduser",
      });
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(updatedUser);
    });

    it("should return 404 if user is not found", async () => {
      req.params.id = "1";
      req.body = { username: "updateduser" };
      userService.update.mockResolvedValue(null);

      await userController.update(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toBe("User not found");
    });
  });

  describe("remove", () => {
    it("should delete user successfully", async () => {
      req.params.id = "1";
      userService.remove.mockResolvedValue(true);

      await userController.remove(req, res);

      expect(userService.remove).toHaveBeenCalledWith("1");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toBe("User deleted successfully");
    });

    it("should return 404 if user is not found", async () => {
      req.params.id = "1";
      userService.remove.mockResolvedValue(false);

      await userController.remove(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toBe("User not found");
    });
  });

  describe("login", () => {
    it("should authenticate user and return token", async () => {
      req.body = { username: "testuser", password: "testpass" };
      const mockUser = {
        id: "1",
        username: "testuser",
        password: "hashedpass",
      };
      userService.readUserByUsername.mockResolvedValue(mockUser);
      userService.validatePassword.mockReturnValue(true);
      userService.generateToken.mockReturnValue("mocktoken");

      await userController.login(req, res);
      expect(userService.readUserByUsername).toHaveBeenCalledWith("testuser");
      expect(userService.validatePassword).toHaveBeenCalledWith(
        "testpass",
        "hashedpass"
      );
      expect(res.statusCode).toBe(200);
      expect(res.cookies.token.value).toBe("mocktoken");
    });

    it("should return 422 for invalid password", async () => {
      req.body = { username: "testuser", password: "wrongpass" };
      const mockUser = {
        id: "1",
        username: "testuser",
        password: "hashedpass",
      };
      userService.readUserByUsername.mockResolvedValue(mockUser);
      userService.validatePassword.mockReturnValue(false);

      await userController.login(req, res);

      expect(res.statusCode).toBe(422);
      expect(res._getJSONData()).toBe("password not ok");
    });

    it("should return 404 for non-existent user", async () => {
      req.body = { username: "testuser", password: "testpass" };
      userService.readUserByUsername.mockResolvedValue(null);

      await userController.login(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toBe("User not found");
    });
  });

  describe("profile", () => {
    it("should return user profile if token is valid", async () => {
      req.cookies = { token: "validtoken" };
      const mockUserData = { id: "1" };
      const mockUser = { username: "testuser", _id: "1" };
      userService.verifyToken.mockReturnValue(mockUserData);
      userService.readUserById.mockResolvedValue(mockUser);

      await userController.profile(req, res);

      expect(userService.verifyToken).toHaveBeenCalledWith("validtoken");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ username: "testuser", _id: "1" });
    });

    it("should return 401 if token is invalid", async () => {
      req.cookies = { token: "invalidtoken" };
      userService.verifyToken.mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await userController.profile(req, res);

      expect(res.statusCode).toBe(401);
      expect(res._getJSONData()).toBe("Token is invalid");
    });
  });

  describe("logout", () => {
    it("should clear token cookie and return true", async () => {
      await userController.logout(req, res);

      expect(res.cookies.token.value).toBe("");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toBe(true);
    });
  });
});
