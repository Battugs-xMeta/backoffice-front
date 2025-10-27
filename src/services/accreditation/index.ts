import { PaginationResponse } from 'types';
import http from '..';
import { Accreditation, AccreditationInput } from './types';

export const keys = {
  terms: 'terms',
  faq: 'faq',
  language: 'language',
  commission: 'commission',
  subscription: 'subscription',
};

namespace accreditation {
  export const list = (body?: AccreditationInput) =>
    http.post<Accreditation[]>(`carecenter/accreditation/list`, {
      body: body ? body : {},
      hasAuth: true,
    });
  export const create = (body: any) =>
    http.post<Accreditation[]>(`carecenter/accreditation`, {
      body,
      hasAuth: true,
    });
  export const get = (id: number) =>
    http.get<Accreditation>(`carecenter/accreditation/${id}`, {
      hasAuth: true,
    });
  export const update = (body: any, id: number) =>
    http.put<Accreditation>(`carecenter/accreditation/${id}`, {
      body,
      hasAuth: true,
    });
  export const sendRequest = (id: number) =>
    http.get<Accreditation>(`carecenter/accreditation/send_request/${id}`, {
      hasAuth: true,
    });
}

export default accreditation;
