import { CareCenterListInterface } from "service/dashboard/types";
import { FileInterface } from "service/file/types";

export enum FilterTransictionsline {
  All = "All",
  OwnRequest = "OwnRequest",
  Moving = "Moving",
  Force = "Force",
  Died = "Died",
}

export interface FilterTransictionsButton {
  value: FilterTransictionsline;
  label: string;
}

export interface TransictiontypeList {
  id: number;
  created_at: string;
  updated_at: string;
  care_center_id: number;
  elderly_id: number;
  elderly: Elderly;
  movement_type: number;
  to_care_center_id: null;
  to_care_center?: CareCenterListInterface;
  unique_number: string;
  out_date: string;
  protocols: null;
  description: string;
  received_employees: null;
  delivered_employees: null;
  received_person: ReceivedPerson;
  received_place: ReceivedPlace;
  death_date: string;
  death_certificate?: FileInterface[];
  forensic_definition?: FileInterface[];
  charity_work: CharityWork;
  created_employee_id: number;
  created_employee: CreatedEmployee;
}

export interface CharityWork {
  company_name: null;
  email: null;
  description: null;
}

export interface CreatedEmployee {
  id: number;
  created_at: string;
  updated_at: string;
  profile_id: number;
  profile: Profile;
  family_name: FamilyName;
  rd: FamilyName;
  birth_date: string;
  gender: number;
  is_disability: boolean;
  salary: number;
  first_name: FirstName;
  last_name: FirstName;
  email: Email;
  is_active: boolean;
  phone: FamilyName;
  position: FirstName;
  care_center_id: number;
  total_worked_year: number;
  worker_year: number;
}

export enum Email {
  Tugsking2002GmailCOM = "tugsking2002@gmail.com",
}

export enum FamilyName {
  Empty = "-",
}

export enum FirstName {
  Admin = "admin",
}

export interface Profile {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: FileName;
  original_name: OriginalName;
  physical_path: PhysicalPath;
  extention: Extention;
  file_size: number;
}

export enum Extention {
  Jpg = "jpg",
}

export enum FileName {
  Cltnt7T6I000701P504Kzpwn0Jpg = "cltnt7t6i000701p504kzpwn0.jpg",
}

export enum OriginalName {
  OykaJpg = "Oyka.jpg",
}

export enum PhysicalPath {
  ImagesCltnt7T6I000701P504Kzpwn0Jpg = "images/cltnt7t6i000701p504kzpwn0.jpg",
}

export interface Elderly {
  id: number;
  created_at: string;
  updated_at: string;
  family_name: string;
  first_name: string;
  last_name: string;
  rd: string;
  gender: number;
  age: number;
  profile: FileInterface;
  birth_date: string;
  is_disability: boolean;
  disability_desc: string;
  education: Education;
  reason: string;
  marriage: string;
  family_count: number;
  children_count: number;
  address: null;
  situational: null;
  definition_governor: null;
  created_user_id: number;
}

export enum Education {
  ТехникийнБолонМэргэжлийн = "Техникийн болон мэргэжлийн",
}

export interface ReceivedPerson {
  first_name: null;
  who: null;
  phone_number: null;
}

export interface ReceivedPlace {
  first_name: null;
  position: null;
  phone_number: null;
}

// }

// export interface Elderly {
//   id: number;
//   created_at: string;
//   updated_at: string;
//   family_name: string;
//   first_name: string;
//   last_name: string;
//   rd: string;
//   gender: number;
//   age: number;
//   birth_date: string;
//   is_disability: boolean;
//   disability_desc: string;
//   education: Education;
//   reason: string;
//   marriage: string;
//   family_count: number;
//   children_count: number;
//   address: null;
//   situational: null;
//   definition_governor: null;
//   created_user_id: number;
// }

export interface ReceivedPerson {
  first_name: null;
  who: null;
  phone_number: null;
}

export interface ReceivedPlace {
  first_name: null;
  position: null;
  phone_number: null;
}

export enum MovementStatusEnum {
  died = 14,
  force = 13,
  moving = 11,
  ownRequest = 12,
}

export const MovementFindName = (status: number) => {
  switch (status) {
    case MovementStatusEnum.died:
      return "Нас барсан";
    case MovementStatusEnum.force:
      return "Албадан гаргасан";
    case MovementStatusEnum.moving:
      return "Шилжсэн";
    case MovementStatusEnum.ownRequest:
      return "Сайн дур";
    default:
      return "Шилжсэн";
  }
};
