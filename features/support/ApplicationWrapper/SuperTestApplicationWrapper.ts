import express from "express";
import { ApplicationResponse, ApplicationWrapper } from "./ApplicationWrapper";
import supertest from "supertest";

export class SuperTestApplicationWrapper implements ApplicationWrapper {
  private wrappedApplication;

  constructor(applicationToWrap: express.Application) {
    this.wrappedApplication = supertest(applicationToWrap);
  }

  async start(): Promise<void> {
    // Nothing to do.
  }

  async stop(): Promise<void> {
    // Nothing to do.
  }

  async post(endpoint: string, body: any): Promise<ApplicationResponse> {
    const supertestResponse = await this.wrappedApplication
      .post(endpoint)
      .send(body)
      .set("Accept", "application/json");

    return {
      status: supertestResponse.status,
      headers: supertestResponse.headers,
      body: supertestResponse.body,
    };
  }
}
