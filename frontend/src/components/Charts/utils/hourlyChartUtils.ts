export const handleBackward = (
  startTime: Date,
  endTime: Date,
  setStartTime: (time: Date) => void,
  setEndTime: (time: Date) => void,
  setIsAutoScroll: (autoScroll: boolean) => void,
  interval: number,
) => {
  setIsAutoScroll(false);
  const newStartTime = new Date(startTime.getTime() - interval * 60 * 1000);
  const newEndTime = new Date(endTime.getTime() - interval * 60 * 1000);
  setStartTime(newStartTime);
  setEndTime(newEndTime);
};

export const handleForward = (
  startTime: Date,
  endTime: Date,
  setStartTime: (time: Date) => void,
  setEndTime: (time: Date) => void,
  setIsAutoScroll: (autoScroll: boolean) => void,
  interval: number,
) => {
  const newStartTime = new Date(startTime.getTime() + interval * 60 * 1000);
  const newEndTime = new Date(endTime.getTime() + interval * 60 * 1000);
  setStartTime(newStartTime);
  setEndTime(newEndTime);

  const now = new Date();
  if (
    newEndTime.getTime() >= now.getTime() - 30 * 60 * 1000 &&
    newStartTime.getTime() <= now.getTime()
  ) {
    setIsAutoScroll(true);
  } else {
    setIsAutoScroll(false);
  }
};

export const handleReturnToCurrent = (
  setStartTime: (time: Date) => void,
  setEndTime: (time: Date) => void,
  setIsAutoScroll: (autoScroll: boolean) => void,
  timeInterval: number,
) => {
  setIsAutoScroll(true);
  const now = new Date();
  setEndTime(now);
  setStartTime(new Date(now.getTime() - timeInterval * 60 * 1000));
};
