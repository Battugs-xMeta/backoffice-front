import dayjs from "dayjs";
import { atom } from "jotai";
import { FinanceStore } from "../store";

export const storeNorExpense = atom<FinanceStore>({
  year: dayjs().year(),
});
