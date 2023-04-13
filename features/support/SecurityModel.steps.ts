import { When, Given, Before } from "@cucumber/cucumber";

Before(async function () {
  this.securityModel = {
    name: "",
    engines: [],
  };
});

Given("A security model", function () {
  this.securityModel.name = "SecurityModelName";
  addCaesarEngineToSecurityModel(this, 3, 1);
  addRotorEngineToSecurityModel(this, "BDFHJLCPRTXVZNYEIWGAKMUSQO");
});

Given(
  "A security model with an unsupported engine named {string}",
  function (engineName) {
    this.securityModel.name = "InvalidSecurityModelName";
    this.securityModel.engines.push({
      name: engineName,
    });
  }
);

Given("The security model named {string}", function (name) {
  this.securityModel.name = name;
});

Given(
  "The Caesar engine with shift {int} and increment {int}",
  function (caesarShift, caesarIncrement) {
    addCaesarEngineToSecurityModel(this, caesarShift, caesarIncrement);
  }
);

Given("The Rotor engine with {string}", function (rotor) {
  addRotorEngineToSecurityModel(this, rotor);
});

Given(
  "I have pushed the security model defined by these previous engines",
  async function () {
    this.response = await callPostSecurityModelEndpoint(this);
  }
);

When("I push the security model", async function () {
  this.response = await callPostSecurityModelEndpoint(this);
});

function addCaesarEngineToSecurityModel(
  world: any,
  caesarShift: number,
  caesarIncrement: number
) {
  world.securityModel.engines.push({
    name: "caesar",
    shift: caesarShift,
    increment: caesarIncrement,
  });
}

function addRotorEngineToSecurityModel(world: any, rotor: string) {
  world.securityModel.engines.push({
    name: "rotor",
    rotor,
  });
}

async function callPostSecurityModelEndpoint(world: any): Promise<any> {
  return await world.requestWithSupertest
    .post("/security-model")
    .send(world.securityModel)
    .set("Accept", "application/json");
}
