export interface ApplicationWrapper {
  start(): Promise<void>;
  stop(): Promise<void>;
  post(endpoint: string, body: any): Promise<ApplicationResponse>;
}

export interface ApplicationResponse {
  status: number;
  headers: Map<string, string>;
  body: any;
}
