import dayjs from "dayjs";
import { atom } from "jotai";
import { FinanceStore } from "../store";

export const storeSpend30 = atom<FinanceStore>({
  year: dayjs().year(),
  month: dayjs().month() + 1,
});
