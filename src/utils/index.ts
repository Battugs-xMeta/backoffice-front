import dayjs, { QUnitType } from "dayjs";
import file from "service/file";
import { FilterDeadline } from "types";

export const calculateTableRowSpan = (
  index: number,
  record: any,
  list: any[],
  dest_field: string
): { rowSpan: number } => {
  let obj = {
    rowSpan: 1,
  };
  if (list.length === 0) return obj;

  // If index equal to zero  , then need to calculate total task which dest field is the same.
  if (index == 0 && list)
    obj.rowSpan = list?.reduce<number>(
      (pre, curr) => (record[dest_field] == curr[dest_field] ? pre + 1 : pre),
      0
    );

  // If current dest field is equal to previous dest field
  // then rowSpan should be zero in order to merge the column
  if (index != 0 && list && list[index - 1][dest_field] == record[dest_field])
    obj.rowSpan = 0;

  // If index isn't zero and current dest field is different from the previous dest field ,
  // then calculate the new total task number
  if (index != 0 && list && list[index - 1][dest_field] != record[dest_field])
    obj.rowSpan = list?.reduce<number>(
      (pre, curr) => (record[dest_field] == curr[dest_field] ? pre + 1 : pre),
      0
    );
  return obj;
};

export const firstLastNames = (lastName?: string, firstName?: string) => {
  if (!firstName || !lastName) return "";

  let sliced_name =
    (firstName || "").charAt(0).toUpperCase() + (firstName || "").slice(1);
  return `${lastName?.substring(0, 1).toUpperCase()}. ${sliced_name}`;
};

export const isDateValid = (date?: Date) => {
  if (!date) return false;
  if (dayjs(date).year() <= 1) return false;
  return true;
};

export const moneyFormat: (
  money?: number | null | undefined,
  currency?: string | undefined
) => string = (money, currency) => {
  if (!money) return 0 as any;
  if (money === 0) return 0 as any;
  let format = new Intl.NumberFormat().format(money);
  if (currency) return `${format} ${currency === "mnt" ? "₮" : "$"}`;
  return format;
};

export const convertFileToUploadFile = (path?: string): any[] | undefined =>
  path
    ? [
        {
          uid: path,
          status: "done",
          response: "",
          url: file.fileToUrl(path),
          name: path,
          isBefore: true,
        },
      ]
    : undefined;

export const getImageSeperate = (
  files?: any[]
): { unChangedImages?: any[]; changedImages?: any[] } => {
  let unChangedImages = files
    ?.filter((el: any) => el.isBefore)
    .map((el) => el.uid);
  let changedImages = files?.filter((el: any) => !el.isBefore);
  return { unChangedImages, changedImages };
};

export const calculateDeadlineDate = (deadline: FilterDeadline) => {
  switch (deadline) {
    case FilterDeadline.FullHours:
      return [dayjs().add(-1, "day"), dayjs()];
    case FilterDeadline.Week:
      return [dayjs().add(-1, "week"), dayjs()];
    case FilterDeadline.Month:
      return [dayjs().add(-30, "day"), dayjs()];
    case FilterDeadline.ThreeMonth:
      return [dayjs().add(-2, "month"), dayjs()];
    case FilterDeadline.SixMonth:
      return [dayjs().add(-5, "month"), dayjs()];
    case FilterDeadline.Year:
      return [dayjs().add(-1, "year"), dayjs()];
    case FilterDeadline.OneMonth:
      return [dayjs().add(-1, "month"), dayjs()];

    default:
      return undefined;
  }
};

export const diffDates = (start?: Date, end?: Date, field?: QUnitType) => {
  return dayjs(start).diff(end, field);
};

export const capitalizate = (value?: string) =>
  value ? value?.charAt(0).toUpperCase() + value?.slice(1, value?.length) : "";

export const isValidDate = (value?: Date) =>
  value ? new Date(value).getFullYear() > 1 : false;

export const formatNumber = (value?: number) => {
  if (!value) return 0;
  if (value < 1000) return value.toFixed(1);
  if (value > 1000 && value < 1000000) {
    return (value / 1000).toFixed(1) + "K";
  }
  if (value > 1000000 && value < 1000000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value > 1000000000 && value < 1000000000000) {
    return (value / 1000000000).toFixed(1) + "B";
  }
  return value.toFixed(1);
};

export const formatKB = (value: number, decimals = 1) => {
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (value === 0) return "0";
  const k: number = 1024;
  const i = Math.floor(Math.log(value) / Math.log(k));
  const tmp = k ** i;
  const dm = decimals < 0 ? 0 : decimals;
  return `${parseFloat((value / tmp).toFixed(dm))}${sizes[i]}`;
};

export const formatMB = (value = 0, decimals = 2) => {
  const sizes = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (value === 0) return "0";
  const k: number = 1024;
  const i = Math.floor(Math.log(value) / Math.log(k));
  const tmp = k ** i;
  const dm = decimals < 0 ? 0 : decimals;
  return `${parseFloat((value / tmp).toFixed(dm))} ${sizes[i]}`;
};

export const dateFormat = (
  date?: any,
  format: string = "YYYY-MM-DD",
  showEmpty: boolean = true
): string => {
  if (!isDateValid(date)) return showEmpty ? "-" : "";

  return dayjs(date).format(format);
};
