import { expect, test, describe, beforeEach } from "vitest";
import { Server } from "../../../src/infrastructure/webserver/Server";
import { ApiRouter } from "../../../src/infrastructure/webserver/ApiRouter";
import { ErrorHandler } from "../../../src/infrastructure/webserver/ErrorHandler";
import { Controller, ControllerResult } from "../../../src/adapter/Controller";
import { mock, mockReset } from "vitest-mock-extended";
import supertest from "supertest";

describe("Server", () => {
  let apiRouter: ApiRouter;
  let errorHandler: ErrorHandler;
  const stubController = mock<Controller<any, any>>();

  beforeEach(() => {
    apiRouter = new ApiRouter();
    errorHandler = new ErrorHandler();
    mockReset(stubController);
  });

  test(`should not build without a router`, async () => {
    expect(() => Server.builder().build()).toThrowError(
      "Cannot build Server without a router"
    );
  });

  test(`should not build without an error handler`, async () => {
    expect(() => Server.builder().withRouter(apiRouter).build()).toThrowError(
      "Cannot build Server without an error handler"
    );
  });

  test(`should build with a router and an error handler`, async () => {
    expect(() => buildServer()).not.toThrow();
  });

  test(`should call a registered POST route`, async () => {
    const server = buildServer();
    const wrappedApplication = supertest(server.expressApplication);

    const controllerResponseBody: ControllerResult = {
      statusCode: 200,
      jsonResponseBody: {
        message: "Operation complete",
      },
    };

    stubController.execute.mockResolvedValueOnce(controllerResponseBody);

    server.registerPostRoute("/any_route", stubController);

    const body = {
      name: "John Doe",
      emails: ["john@domain.eu", "jd@domain.eu"],
    };

    const supertestResponse = await wrappedApplication
      .post("/any_route")
      .send(body)
      .set("Accept", "application/json");

    expect(stubController.execute).toHaveBeenCalledOnce();
    expect(stubController.execute).toHaveBeenCalledWith(body);

    expect(supertestResponse.status).toBe(200);
    expect(supertestResponse.body).toStrictEqual({
      message: "Operation complete",
    });
  });

  test(`should handle errors`, async () => {
    const server = buildServer();
    const wrappedApplication = supertest(server.expressApplication);

    stubController.execute.mockRejectedValueOnce(new Error("Any error"));

    server.registerPostRoute("/any_route", stubController);

    const body = {
      name: "John Doe",
      emails: ["john@domain.eu", "jd@domain.eu"],
    };

    const supertestResponse = await wrappedApplication
      .post("/any_route")
      .send(body)
      .set("Accept", "application/json");

    expect(stubController.execute).toHaveBeenCalledOnce();
    expect(stubController.execute).toHaveBeenCalledWith(body);

    expect(supertestResponse.status).toBe(500);
    expect(supertestResponse.body).toStrictEqual({
      error: "Any error",
    });
  });

  function buildServer(): Server {
    return Server.builder()
      .withRouter(apiRouter)
      .withErrorHandler(errorHandler)
      .build();
  }
});
