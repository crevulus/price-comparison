import Rollbar from "rollbar";

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
    console.log("known post error on componentDidMount: " + error);
  };
  return { logErrorInfo, logErrorInRollbar };
})();

export default RollbarErrorTracking;
