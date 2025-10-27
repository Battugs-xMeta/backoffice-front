import dayjs from "dayjs";
import { atom } from "jotai";

export interface DonationStoreInterface {
  year: number;
}

export const donationStore = atom<DonationStoreInterface>({
  year: dayjs().year(),
});
