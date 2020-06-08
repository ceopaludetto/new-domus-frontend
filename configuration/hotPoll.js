/* eslint-disable */
/* globals __resourceQuery */
if (module.hot) {
  const hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;

  const checkForUpdate = function checkForUpdate(fromUpdate) {
    if (module.hot.status() === "idle") {
      module.hot
        .check(true)
        .then(function (updatedModules) {
          if (!updatedModules) {
            return;
          }
          checkForUpdate(true);
        })
        .catch(function (err) {
          const status = module.hot.status();
          if (["abort", "fail"].indexOf(status) >= 0) {
            console.log("Cannot apply update.");
            console.log("You need to restart the application!");
          }
        });
    }
  };
  setInterval(checkForUpdate, hotPollInterval);
} else {
  throw new Error("Hot Module Replacement is disabled.");
}
