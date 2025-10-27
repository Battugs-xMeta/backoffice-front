import { Elderly } from 'service/care-information/types';
import { Base } from 'types';

export interface PaymentInterface extends Base {
  register: number;
  expense: number;
  elderlies: PaymentElderly[];
}

export interface PaymentElderly {
  elderly: Elderly;
  total_paid: number;
  payment_type: string;
  months: Month[];
}

export interface Month {
  id: number;
  name: string;
  amount: number;
  status: number;
}
