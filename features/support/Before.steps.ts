import { After, Before, BeforeAll } from "@cucumber/cucumber";
import { DependencyInjector } from "../../src/DependencyInjector";
import { SuperTestApplicationWrapper } from "./ApplicationWrapper/SuperTestApplicationWrapper";
import { TestContainersApplicationWrapper } from "./ApplicationWrapper/TestContainersApplicationWrapper";
import { TestContainersGenericApplicationWrapper } from "./ApplicationWrapper/TestContainersGenericApplicationWrapper";

const PORT = 3000;

Before({ timeout: 60 * 1000 }, async function () {
  this.di = new DependencyInjector();

  setupWithSupertest(this);
  //setupWithTestContainersBasedOnGenericContainers(this);
  //setupWithTestContainersBasedOnDockerCompose(this);

  await this.applicationWrapper.start();
});

After({ timeout: 60 * 1000 }, async function () {
  await this.applicationWrapper.stop();
});

function setupWithSupertest(world: any) {
  world.applicationWrapper = new SuperTestApplicationWrapper(
    world.di.server.expressApplication
  );
}

function setupWithTestContainersBasedOnGenericContainers(world: any) {
  world.applicationWrapper = new TestContainersGenericApplicationWrapper(PORT);
}

function setupWithTestContainersBasedOnDockerCompose(world: any) {
  world.applicationWrapper = new TestContainersApplicationWrapper(PORT);
}
