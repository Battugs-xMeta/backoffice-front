import dayjs from "dayjs";
import { atom } from "jotai";
import { FinanceStore } from "../store";
import { FinanceDonationTypeArray } from "service/finance/type";

export const storeDonationForm = atom<FinanceStore>({
  year: dayjs().year(),
  month: dayjs().month() + 1,
  donation_type: FinanceDonationTypeArray?.[0].value,
});
