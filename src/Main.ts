import { ApplicationBuilder } from "./ApplicationBuilder";

const PORT = 3000;
const di = new ApplicationBuilder();
const server = di.server;
server.expressApplication.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
