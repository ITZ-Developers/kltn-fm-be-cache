import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { DATE_FORMAT } from "../static/constant";

dayjs.extend(utc);

const schemaOptions = {
  timestamps: {
    currentTime: () => dayjs().utc().toDate(),
  },
  toJSON: {
    getters: true,
    transform: (doc, ret) => {
      if (ret.createdAt) {
        ret.createdAt = dayjs(ret.createdAt).utc().format(DATE_FORMAT);
      }
      if (ret.updatedAt) {
        ret.updatedAt = dayjs(ret.updatedAt).utc().format(DATE_FORMAT);
      }
      return ret;
    },
  },
  toObject: { getters: true },
};

export { schemaOptions };
