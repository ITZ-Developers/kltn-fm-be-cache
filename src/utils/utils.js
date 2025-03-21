import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { DATE_FORMAT } from "../static/constant.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDateUTC = () => dayjs().utc().format(DATE_FORMAT);

const encrypt = (value, secretKey) => {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};

const decrypt = (encryptedValue, secretKey) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt, formatDateUTC };
