import { After, Before } from "@cucumber/cucumber";
import { ApplicationBuilder } from "../../src/ApplicationBuilder";
import { SuperTestApplicationWrapper } from "./ApplicationWrapper/SuperTestApplicationWrapper";
import { TestContainersApplicationWrapper } from "./ApplicationWrapper/TestContainersApplicationWrapper";
import { TestContainersGenericApplicationWrapper } from "./ApplicationWrapper/TestContainersGenericApplicationWrapper";

const PORT = 3000;
const CUCUMBER_BLACKBOX_PARAMETER = "blackbox";
const CUCUMBER_BLACKBOX_DOCKER_COMPOSE_PARAMETER = "blackbox_docker_compose";
const TEST_SETUP_AND_TEARDOWN_TIMEOUT = 60 * 1000;

Before({ timeout: TEST_SETUP_AND_TEARDOWN_TIMEOUT }, async function () {
  setupDependencyInjectonContainer(this);
  setupApplication(this);
  await startApplication(this);
});

After({ timeout: TEST_SETUP_AND_TEARDOWN_TIMEOUT }, async function () {
  await stopApplication(this);
});

function setupDependencyInjectonContainer(world: any) {
  world.di = new ApplicationBuilder();
}

function setupApplication(world: any) {
  const testingApproach = world.parameters.testingApproach;
  if (testingApproach === CUCUMBER_BLACKBOX_PARAMETER) {
    wrapApplicationWithTestContainersBasedOnGenericContainers(world);
  } else if (testingApproach === CUCUMBER_BLACKBOX_DOCKER_COMPOSE_PARAMETER) {
    wrapApplicationWithTestContainersBasedOnDockerCompose(world);
  } else {
    wrapApplicationWithSupertest(world);
  }
}

async function startApplication(world: any) {
  await world.applicationWrapper.start();
}

async function stopApplication(world: any) {
  await world.applicationWrapper.stop();
}

function wrapApplicationWithSupertest(world: any) {
  world.applicationWrapper = new SuperTestApplicationWrapper(
    world.di.server.expressApplication
  );
}

function wrapApplicationWithTestContainersBasedOnGenericContainers(world: any) {
  world.applicationWrapper = new TestContainersGenericApplicationWrapper(PORT);
}

function wrapApplicationWithTestContainersBasedOnDockerCompose(world: any) {
  world.applicationWrapper = new TestContainersApplicationWrapper(PORT);
}
