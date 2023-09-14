const common = {
  format: ["progress"],
  requireModule: ["ts-node/register"],
  require: ["features/support/*.ts"],
  publishQuiet: true,
};

module.exports = {
  default: {
    ...common,
  },
  blackbox: {
    ...common,
    worldParameters: {
      testingApproach: "blackbox",
    },
  },
  blackbox_docker_compose: {
    ...common,
    worldParameters: {
      testingApproach: "blackbox_docker_compose",
    },
  },
};
