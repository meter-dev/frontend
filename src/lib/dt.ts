import dayjs from "dayjs";

export const formatTime = (isoDateTime: string) => {
  return dayjs(isoDateTime).format("YYYY-MM-DD HH:mm:ss");
};
