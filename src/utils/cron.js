import cron from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import https from "https";
import { ENV } from "../static/constant.js";
import axios from "axios";

dayjs.extend(utc);
dayjs.extend(timezone);

const jobs = {
  // 1 minute
  activeService: new cron.CronJob("* * * * *", async () => {
    for (const url of ENV.APP_URLS) {
      https
        .get(url, (res) => {
          if (res.statusCode == 200) {
            console.log(`[WARN] GET request sent successfully to ${url}`);
          } else {
            console.log(`[WARN] GET request failed to ${url}`);
          }
        })
        .on("error", (e) => {
          console.error(`[ERROR] Error while sending request to ${url}`);
        });
    }
  }),
};

const startAllJobs = () => {
  Object.values(jobs).forEach((job) => job.start());
  console.log("All cron jobs have been started.");
};

const reloadWebsite = () => {
  for (const url of ENV.APP_URLS) {
    axios
      .get(url)
      .then((response) => {
        console.log(
          `[${url}] Reloaded at ${new Date().toISOString()}: Status Code ${
            response.status
          }`
        );
      })
      .catch((error) => {
        console.error(
          `[${url}] Error reloading at ${new Date().toISOString()}:`,
          error.message
        );
      });
  }
};

export { jobs, startAllJobs, reloadWebsite };
