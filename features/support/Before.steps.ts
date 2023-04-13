import { Before } from "@cucumber/cucumber";
import supertest from "supertest";
import { DependencyInjector } from "../../src/DependencyInjector";

Before(async function () {
  this.di = new DependencyInjector();
  this.requestWithSupertest = supertest(this.di.server.expressApplication);
});
