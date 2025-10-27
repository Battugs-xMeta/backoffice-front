import dayjs from "dayjs";
import { atom } from "jotai";

export interface ExpenseStoreInterface {
  year: number;
}

export const expenseStore = atom<ExpenseStoreInterface>({
  year: dayjs().year(),
});
