import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
  Wait,
} from "testcontainers";
import { ApplicationResponse, ApplicationWrapper } from "./ApplicationWrapper";
import axios from "axios";
import path from "node:path";

const DOCKER_COMPOSE_FILE_RELATIVE_LOCATION = "../../../";
const DOCKER_COMPOSE_FILE_NAME = "docker-compose.yml";

const SERVICE_NAME = "api-1"; // Windows
//const SERVICE_NAME = "api_1"; // Linux/Mac

export class TestContainersApplicationWrapper implements ApplicationWrapper {
  private readonly port: number;
  private environment?: StartedDockerComposeEnvironment;
  private apiUrl?: string;

  constructor(port: number) {
    this.port = port;
  }

  async start(): Promise<void> {
    console.log("mounting docker compose...");

    this.environment = await new DockerComposeEnvironment(
      this.dockerComposeFileFolderPath(),
      DOCKER_COMPOSE_FILE_NAME
    )
      .withWaitStrategy(
        SERVICE_NAME,
        Wait.forLogMessage(`server is listening on ${this.port}`)
      )
      .up();

    /*
    const apiContainer = this.environment.getContainer(SERVICE_NAME);
    (await apiContainer.logs())
      .on("data", (line) => console.log(line))
      .on("err", (line) => console.error(line))
      .on("end", () => console.log("Stream closed"));
      */

    this.apiUrl = this.retrieveApiUrl();
    console.log(`Docker compose mounted, listening to: ${this.apiUrl}`);
  }

  async stop(): Promise<void> {
    console.log("Downing docker compose");
    await this.environment!.down({ timeout: 10000 }); // ms
    console.log("Docker compose down");
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

  private retrieveApiUrl(): string {
    const apiContainer = this.environment!.getContainer(SERVICE_NAME);
    const apiUrl = `http://${apiContainer.getHost()}:${apiContainer.getMappedPort(
      this.port
    )}`;
    return apiUrl;
  }

  private dockerComposeFileFolderPath(): string {
    return path.resolve(__dirname, DOCKER_COMPOSE_FILE_RELATIVE_LOCATION);
  }
}
