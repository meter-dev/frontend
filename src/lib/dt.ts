import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatTime = (timestamp: string | number) => {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};

export const fromNow = (timestamp: string | number) => {
  return dayjs(timestamp).fromNow();
};
