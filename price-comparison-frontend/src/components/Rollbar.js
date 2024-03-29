import Rollbar from "rollbar";

// Rollbar is used for error insights.
export const RollbarErrorTracking = (() => {
  const RollbarObj = new Rollbar({
    accessToken: "0ce9535f3dd24309b9d856cbfa6726e7",
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  const logErrorInfo = (info) => {
    RollbarObj.info(info);
  };
  const logErrorInRollbar = (error) => {
    console.log(error);
  };
  return { logErrorInfo, logErrorInRollbar };
})();

export default RollbarErrorTracking;
