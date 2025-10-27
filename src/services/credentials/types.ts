import { RadioChangeEvent } from "antd";
import dayjs from "dayjs";

const currentYear = dayjs().year();
export enum FilterCredentialsYearline {
  A2021 = currentYear - 3,
  A2022 = currentYear - 2,
  A2023 = currentYear - 1,
  All = "all",
  //   A16 = "A16", // "AC-1.6",
}

export interface FilterCredentialsYearButton {
  value: FilterCredentialsYearline;
  label: string;
  onChange?: (e: RadioChangeEvent) => void;
}
