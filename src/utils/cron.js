import cron from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import https from "https";
import { ENV } from "../static/constant.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const jobs = {
  activeService: new cron.CronJob("*/10 * * * *", async function () {
    https
      .get(ENV.APP_URL, (res) => {
        if (res.statusCode == 200) {
          console.log(`[WARN] GET request sent successfully to ${ENV.APP_URL}`);
        } else {
          console.log("[WARN] GET request failed", res.statusCode);
        }
      })
      .on("error", (e) => {
        console.error("[ERROR] Error while sending request", e);
      });
  }),
};

const startAllJobs = () => {
  Object.values(jobs).forEach((job) => job.start());
  console.log("All cron jobs have been started.");
};

export { jobs, startAllJobs };
