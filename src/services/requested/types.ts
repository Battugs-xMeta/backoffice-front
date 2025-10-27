export interface RequestItem {
  id: number;
  created_at: string;
  updated_at: string;
  elderly_id: number;
  elderly: Elderly;
  care_center_id: number;
  social_worker_elderly_id: number;
  social_worker_elderly: SocialWorkerElderly;
  status: number;
}

export interface Elderly {
  id: number;
  created_at: string;
  updated_at: string;
  profile_id: number;
  profile: Profile;
  family_name: string;
  first_name: string;
  last_name: string;
  rd: string;
  gender: number;
  age: number;
  birth_date: string;
  is_disability: boolean;
  disability_desc: string;
  education: string;
  reason: string;
  marriage: string;
  family_count: number;
  children_count: number;
  address: null;
  situational: null;
  definition_governor: null;
  created_user_id: number;
}

export interface Profile {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
  created_user_id: number;
}

export interface SocialWorkerElderly {
  id: number;
  created_at: string;
  updated_at: string;
  created_user_id: number;
  modified_user_id: number;
  care_center_id: number;
  elderly_id: number;
  status: number;
  city_id: number;
  city: City;
  district_id: number;
  khoroo_id: number;
  ordinances: DefinitionGovernor[];
  welfare_documents: DefinitionGovernor[];
}

export interface City {
  id: number;
  created_at: string;
  updated_at: string;
  code: string;
  name: string;
  is_active: boolean;
}

export interface UserDetailListType {
  id: number;
  created_at: string;
  updated_at: string;
  elderly_id: number;
  elderly: Elderlys;
  care_center_id: number;
  social_worker_elderly_id: number;
  social_worker_elderly?: SocialWorkerElderly
  status: number;
}

export interface Elderlys {
  id: number;
  created_at: string;
  updated_at: string;
  profile_id: number;
  family_name: string;
  first_name: string;
  last_name: string;
  rd: string;
  gender: number;
  age: number;
  birth_date: string;
  is_disability: boolean;
  disability_desc: string;
  education: string;
  reason: string;
  welfare_documents: any;
  marriage: string;
  family_count: number;
  children_count: number;
  laboratory_tests: LaboratoryTest[];
  address: Address;
  documents: Documents;
  situational: DefinitionGovernor[];
  definition_governor: DefinitionGovernor[];
  created_user_id: number;
  social_worker_elderly: SocialWorkerElderly;
}

export interface Address {
  id: number;
  created_at: string;
  updated_at: string;
  elderly_id: number;
  city_id: number;
  city: Citys;
  district_id: number;
  district: Citys;
  khoroo_id: number;
  khoroo: Citys;
  street: string;
  description: string;
}

export interface Citys {
  id: number;
  created_at: string;
  updated_at: string;
  code?: string;
  name: string;
  is_active: boolean;
  city_id?: number;
  district_id?: number;
  description?: string;
}

export interface DefinitionGovernor {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: Extention;
  file_size: number;
}

export enum Extention {
  Jpg = "jpg",
  PNG = "png",
}

export interface Documents {
  id: number;
  created_at: string;
  updated_at: string;
  elderly_id: number;
  is_pension_loan: boolean;
  care_request: DefinitionGovernor[];
  insurance_notebook: DefinitionGovernor[];
  is_pension_inquiry: DefinitionGovernor[];
  pension_loan: DefinitionGovernor[];
  is_disability_inquiry: DefinitionGovernor[];
  other_welfare_services_inquiry: DefinitionGovernor[];
  insurance_discounts_inquiry: DefinitionGovernor[];
  care_center_discount_inquiry: DefinitionGovernor[];
  identity_card: DefinitionGovernor[];
  property_inquiry: DefinitionGovernor[];
  is_have_children_inquiry: DefinitionGovernor[];
  is_have_sibling_inquiry: DefinitionGovernor[];
  is_married_inquiry: DefinitionGovernor[];
  is_divorce_inquiry: DefinitionGovernor[];
}

export interface LaboratoryTest {
  id: number;
  created_at: string;
  updated_at: string;
  elderly_id: number;
  laboratory_test_id: number;
  laboratory_test: City;
  files: DefinitionGovernor[];
}

export enum GenderType {
  male = "male",
  female = "female",
}

export enum FilterRequestedline {
  requested = 4,
  returned = 6,
}

export interface FilterRequestedButton {
  value: FilterRequestedline;
  label: string;
}
