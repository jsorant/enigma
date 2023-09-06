import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";
import { ApplicationResponse, ApplicationWrapper } from "./ApplicationWrapper";
import axios from "axios";
import path from "node:path";

const SOURCES_RELATIVE_LOCATION = "../../../";

export class TestContainersGenericApplicationWrapper
  implements ApplicationWrapper
{
  private readonly port: number;
  private apiContainer?: StartedTestContainer;
  private apiUrl?: string;

  constructor(port: number) {
    this.port = port;
  }

  async start(): Promise<void> {
    console.log("Mounting generic container...");

    this.apiContainer = await new GenericContainer("node:14")
      .withExposedPorts(this.port)
      .withBindMounts([
        {
          source: this.sourcesPath(),
          target: "/app",
          mode: "ro",
        },
      ])
      .withWorkingDir("/app")
      .withCommand(["npm", "run", "dev"])
      .withWaitStrategy(
        Wait.forLogMessage(`server is listening on ${this.port}`)
      )
      .start();

    /*
    (await this.apiContainer.logs())
      .on("data", (line) => console.log(line))
      .on("err", (line) => console.error(line))
      .on("end", () => console.log("Stream closed"));
      */

    this.apiUrl = this.makeApiUrl();
    console.log(`Generic container mounted, listening to: ${this.apiUrl}`);
  }

  async stop(): Promise<void> {
    console.log("Stopping generic container...");
    await this.apiContainer!.stop();
    console.log("Generic container stopped");
  }

  async post(endpoint: string, body: any): Promise<ApplicationResponse> {
    const url = this.makeUrl(endpoint);
    try {
      const axiosResponse = await axios.post(url, body);
      return this.convertAxiosResponseToApplicationResponse(axiosResponse);
    } catch (axiosError: any) {
      return this.convertAxiosErrorToApplicationResponse(axiosError);
    }
  }

  private makeUrl(endpoint: string) {
    return `${this.apiUrl}${endpoint}`;
  }

  private convertAxiosResponseToApplicationResponse(
    axiosResponse: any
  ): ApplicationResponse {
    return {
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      body: axiosResponse.data,
    };
  }

  private convertAxiosErrorToApplicationResponse(error: any): any {
    return {
      status: error.response.status,
      headers: error.response.headers,
      body: error.response.data,
    };
  }

  private makeApiUrl(): string {
    const apiUrl = `http://${this.apiContainer!.getHost()}:${this.apiContainer!.getMappedPort(
      this.port
    )}`;
    return apiUrl;
  }

  private sourcesPath(): string {
    return path.resolve(__dirname, SOURCES_RELATIVE_LOCATION);
  }
}
