import { DependencyInjector } from "./DependencyInjector";

const di = new DependencyInjector();
const server = di.server;
server.start(3000);
