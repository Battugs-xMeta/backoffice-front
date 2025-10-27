import { PaginationResponse, SuccessResponse } from 'types';
import http from '..';
import { PaymentInterface } from './type';

namespace payment {
  export const create = (body: any) =>
    http.post('/carecenter/payment', {
      hasAuth: true,
      body,
    });
  export const list = (body: any) =>
    http.post<PaymentInterface>('/carecenter/payment/list', {
      hasAuth: true,
      body,
    });
}

export default payment;
