import { Rule } from "antd/lib/form";
import {
  PROPERTY_TYPE_ENUM,
  RESPONSIBILITY_TYPE_ENUM,
} from "service/registration-form/types";
import { GenderType } from "service/workers/type";
import KhanBank from "/banks/khan.png";
import Khas from "/banks/khas.png";
import GovBank from "/banks/govBank.png";
import TDB from "/banks/trade.png";
import Golomt from "/banks/golomt.png";
import Bank1 from "/banks/bank1.png";
import Bank3 from "/banks/bank3.png";
import Bank2 from "/banks/bank2.png";
import Bank4 from "/banks/bank4.png";
import Wallet from "/banks/wallet.png";
export const deleteConfirm = "delete me";
export const deleteConfirmReg = /^delete me$/g;
export const FieldRequireMessage = "Заавал бөглөх шаардлагатай";

export const FORM_ITEM_RULE: (value?: any) => Rule[] = (value?: any) => [
  { message: FieldRequireMessage, required: true, ...value },
];

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const BankList = Object.freeze([
  {
    image: KhanBank,
    label: "Хаан банк",
    value: "khan_bank",
  },
  {
    image: Khas,
    label: "Хас банк",
    value: "khas_bank",
  },
  {
    image: GovBank,
    label: "Төрийн банк",
    value: "state_bank",
  },
  {
    image: TDB,
    label: "Худалдаа хөгжлийн банк",
    value: "trade_development_bank",
  },
  {
    image: Golomt,
    label: "Голомт банк",
    value: "golomt_bank",
  },
  {
    image: Bank1,
    label: "Үндэсний ХОБанк",
    value: "national_bank",
  },
  {
    image: Bank3,
    label: "Капитрон банк",
    value: "capitron_bank",
  },
  {
    image: Bank2,
    label: "Чингис хаан банк",
    value: "chingis_bank",
  },
  {
    image: Wallet,
    label: "Монгол банк",
    value: "mongol_bank",
  },
  {
    image: Bank4,
    label: "Тээвэр хөгжлийн банк",
    value: "trans_bank",
  },
  {
    image: Wallet,
    label: "Ариг банк",
    value: "arig_bank",
  },
  {
    image: Wallet,
    label: "М банк",
    value: "m_bank",
  },
  {
    image: Wallet,
    label: "Төрийн сан",
    value: "state_fund",
  },
  {
    image: Wallet,
    label: "МҮЦК төв",
    value: "msc_center",
  },
  {
    image: Wallet,
    label: "Ард кредит",
    value: "ard_credit",
  },
  {
    image: Wallet,
    label: "Hi Pay",
    value: "hi_pay",
  },
  {
    image: Wallet,
    label: "Мобифинанс",
    value: "mobifinance",
  },
  // {
  //   image: Wallet,
  //   label: "ҮЦаас төвлөрсөн хадгаламж төв",
  //   value: "mobifinance",
  // },
  // {
  //   image: Wallet,
  //   label: "Мобифинанс",
  //   value: "mobifinance",
  // },
]);

export const BUCKET_NAMES = {
  photos: "photos",
  banners: "banners",
  logo: "logo",
  productBanner: "productbanner",
  productPhotos: "productphotos",
  notifications: "notifications",
  avatars: "avatars",
  menus: "menus",
};

export const DrawerLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// Service

export const workersGenderArray = Object.freeze([
  {
    label: "Эрэгтэй",
    value: GenderType.male,
  },
  {
    label: "Эмэгтэй",
    value: GenderType.female,
  },
]);
// Product

export const AccreditationStatus = {
  Temprary: 1,
  SentRequest: 2,
  Approved: 3,
  Rejected: 4,
};

export const BANK_ARRAY = Object.freeze([
  {
    value: "tdb",
    label: "Trade and Development bank",
  },
  {
    value: "khaan",
    label: "Khan bank",
  },
  {
    value: "golomt",
    label: "Golomt bank",
  },
  {
    value: "khas",
    label: "Xac bank",
  },
  {
    value: "state",
    label: "State bank",
  },
  {
    value: "capitron",
    label: "Capitron bank",
  },
]);

export const CURRENCY_ARRAY = Object.freeze([
  {
    label: "MNT",
    value: "mnt",
    symbol: "₮",
  },
  {
    label: "USD",
    value: "usd",
    symbol: "$",
  },
]);

// requested
export const ElderlyWaitStatus = {
  0: "No",
  4: "Waiting",
  3: "Хүлээгдэж байгаа",
};

// transictions
export const TransictionsStatus = {
  11: "Шилжсэн",
  13: "Албадан гаргасан",
  12: "Өөрийн хүсэлтээр гарсан",
  14: "Нас барсан",
};

//registration-form
export const RegisterFormStatus = {
  1: "Хадгалсан",
  0: "Хадгалсан",
  2: "Илгээсэн",
  3: "Батлагдсан",
  4: "Татгалзсан",
};

export enum RegisterFormStatusEnum {
  saved0 = 0,
  saved = 1,
  sent = 2,
  approved = 3,
  rejected = 4,
}

export const TransictionsStatusArray = Object.freeze([
  {
    label: "Асрамжийн газар хооронд шилжих",
    value: 11,
  },
  {
    label: "Албадан гаргасан",
    value: 13,
  },
  {
    label: "Өөрийн хүсэлтээр гарсан",
    value: 12,
  },
  {
    label: "Нас барсан",
    value: 14,
  },
]);
// registration-form
export const RESPONSIBILITY_TYPE = Object.freeze([
  {
    label: "Хувьцаат компани",
    value: RESPONSIBILITY_TYPE_ENUM.joint_stock_company,
  },
  {
    label: "Хязгаарлагдмал хариуцлагатай компани",
    value: RESPONSIBILITY_TYPE_ENUM.limited_liability_Company,
  },
  {
    label: "Бүх гишүүд нь хариуцлагатай нөхөрлөл",
    value: RESPONSIBILITY_TYPE_ENUM.all_members_responsible_partnership,
  },
  {
    label: "Зарим гишүүд нь хариуцлагатай нөхөрлөл",
    value: RESPONSIBILITY_TYPE_ENUM.some_members_responsible_partnership,
  },
  {
    label: "Хоршоо",
    value: RESPONSIBILITY_TYPE_ENUM.cooperative,
  },
  {
    label: "Төрийн өмчит үйлдвэрийн газар",
    value: RESPONSIBILITY_TYPE_ENUM.state_owned_industrial_estate,
  },
  {
    label: "Орон нутгийн өмчит үйлдвэрийн газар",
    value: RESPONSIBILITY_TYPE_ENUM.localle_owned_industrial_estate,
  },
  {
    label: "Төсөвт байгууллага",
    value: RESPONSIBILITY_TYPE_ENUM.budgetary_organization,
  },
  {
    label: "Төрийн бус байгууллага",
    value: RESPONSIBILITY_TYPE_ENUM.non_governmental_organization,
  },
  {
    label: "Сан",
    value: RESPONSIBILITY_TYPE_ENUM.San,
  },
  {
    label: "Бусад",
    value: RESPONSIBILITY_TYPE_ENUM.others,
  },
]);

export const POSSESSION_TYPE_ENUM = Object.freeze({
  PERSONAL: 1,
  RENT: 2,
  RENT_FREE: 3,
});

export const POSSESSION_TYPE = Object.freeze([
  {
    label: "Өөрийн",
    value: POSSESSION_TYPE_ENUM.PERSONAL,
  },
  {
    label: "Түрээсийн",
    value: POSSESSION_TYPE_ENUM.RENT,
  },
  {
    label: "Хөлсгүй түрээсийн",
    value: POSSESSION_TYPE_ENUM.RENT_FREE,
  },
]);

export const PROPERTY_TYPE = Object.freeze([
  {
    label: "Төрийн өмчийн",
    value: PROPERTY_TYPE_ENUM.state_owned,
  },
  {
    label: "Төрийн өмчийн оролцоотой",
    value: PROPERTY_TYPE_ENUM.state_equity_participation,
  },
  {
    label: "Төрийн хамтарсан",
    value: PROPERTY_TYPE_ENUM.state_joind,
  },
  {
    label: "Орон нутгийн өмчийн",
    value: PROPERTY_TYPE_ENUM.local_owned,
  },
  {
    label: "Орон нутгийн өмчийн оролцоотой",
    value: PROPERTY_TYPE_ENUM.local_equity_participation,
  },
  {
    label: "Орон нутгийн хамтарсан",
    value: PROPERTY_TYPE_ENUM.local_joind,
  },
  {
    label: "Хувийн Монгол Улсын",
    value: PROPERTY_TYPE_ENUM.personal_mongolia,
  },
  {
    label: "Хувийн гадаадтай хамтарсан",
    value: PROPERTY_TYPE_ENUM.personal_joint_country,
  },
  {
    label: "Хувийн гадаад улсын",
    value: PROPERTY_TYPE_ENUM.personal_foreign_country,
  },
]);

export const ROOM_TYPE_ENUM = Object.freeze({
  ONE_TO_THREE: 1,
  FOUR_TO_FIVE: 2,
  UP_SIX: 3,
});

export const ROOM_TYPE = Object.freeze([
  {
    label: "1-3",
    value: ROOM_TYPE_ENUM.ONE_TO_THREE,
  },
  {
    label: "4-5",
    value: ROOM_TYPE_ENUM.FOUR_TO_FIVE,
  },
  {
    label: "6-с дээш",
    value: ROOM_TYPE_ENUM.UP_SIX,
  },
]);

export const SOURCE_OF_WATER_ENUM = Object.freeze({
  FOCUSED: 1,
  UNFOCUSED: 2,
});
export const SOURCE_OF_WATER_TYPE = Object.freeze([
  {
    label: "Төвлөрсөн",
    value: SOURCE_OF_WATER_ENUM.FOCUSED,
  },
  {
    label: "Төвлөрсөн бус",
    value: SOURCE_OF_WATER_ENUM.UNFOCUSED,
  },
]);

export const HEAT_SOURCE_ENUM = Object.freeze({
  FOCUSED: 1,
  UNFOCUSED: 2,
  INDEPENDENT: 3,
});

export const HEAT_SOURCE_TYPE = Object.freeze([
  {
    label: "Төвлөрсөн",
    value: HEAT_SOURCE_ENUM.FOCUSED,
  },
  {
    label: "Төвлөрсөн бус",
    value: HEAT_SOURCE_ENUM.UNFOCUSED,
  },
  {
    label: "Бие даасан",
    value: HEAT_SOURCE_ENUM.INDEPENDENT,
  },
]);

export const DevelopmentPlanOption = Object.freeze([
  {
    label: "Хуваарийн дагуу",
    value: 1,
  },
  {
    label: "Тухай бүр",
    value: 2,
  },
  {
    label: "Тогтмол",
    value: 3,
  },
  {
    label: "Сард нэг удаа",
    value: 4,
  },
  {
    label: "Хагас жилийн хугацаанд",
    value: 5,
  },
]);

export const HOT_WATERSUPPLY_TYPE = Object.freeze([
  {
    label: "Төвлөрсөн",
    value: 1,
  },
  {
    label: "Бие даасан",
    value: 2,
  },
  {
    label: "Халуун усгүй",
    value: 3,
  },
]);

export const PROPERTY_REPORT_TYPE_ENUM = Object.freeze({
  STATE: 111,
  LOCAL: 222,
  PRIVATE: 333,
});
export const PROPERTY_REPORT_TYPE = Object.freeze([
  {
    label: "Төрийн",
    value: PROPERTY_REPORT_TYPE_ENUM.STATE,
  },
  {
    label: "Орон нутгийн",
    value: PROPERTY_REPORT_TYPE_ENUM.LOCAL,
  },
  {
    label: "Хувийн",
    value: PROPERTY_REPORT_TYPE_ENUM.PRIVATE,
  },
]);

export const proMNLocale = {
  moneySymbol: "₮",
  form: {
    lightFilter: {
      more: "Цааш",
      clear: "Цэвэрлэх",
      confirm: "Хайх",
      itemUnit: " ",
    },
  },
  tableForm: {
    search: "Хайх",
    reset: "Цэвэрлэх",
    submit: "Илгээх",
    collapsed: "Нээх",
    expand: "Хаах",
    inputPlaceholder: "Оруулна уу",
    selectPlaceholder: "Сонгоно уу",
  },
  alert: {
    clear: "Цэвэрлэх",
    selected: "Сонгогдсон",
    item: "Бичилт",
  },
  pagination: {
    total: {
      range: " ",
      total: "ийн",
      item: "бичилтүүд",
    },
  },
  tableToolBar: {
    leftPin: "Зүүн талруу тэмдэглэх",
    rightPin: "Баруун талруу тэмдэглэх",
    noPin: "Тэмдэглээгүй",
    leftFixedTitle: "Зүүн талдаа хөдлөхгүй",
    rightFixedTitle: "Баруун талдаа хөдлөхгүй",
    noFixedTitle: "Хөдлөнө",
    reset: "Цэвэрлэх",
    columnDisplay: "Талбар харуулах",
    columnSetting: "Тохиргоо",
    fullScreen: "Дэлгэц дүүргэх",
    exitFullScreen: "Дэлгэц дүүргэлт гаргах",
    reload: "Дахин уншуулах",
    density: "Нягтаршил",
    densityDefault: "Үндсэн",
    densityLarger: "Том",
    densityMiddle: "Дунд",
    densitySmall: "Жижиг",
  },
  stepsForm: {
    next: "Үргэлжлүүлэх",
    prev: "Буцах",
    submit: "Бүртгэх",
  },
  loginForm: {
    submitText: "Нэвтрэх",
  },
  editableTable: {
    action: {
      save: "Хадгалах",
      cancel: "Цуцлах",
      delete: "Устгах",
    },
  },
  switch: {
    open: "нээх",
    close: "хаах",
  },
};

export enum ElderlyStatus {
  ElderlySave = 1,
  ElderlySavee = 0,
  ElderlyRequestSendToDistrict = 2,
  ElderlyRequestSendSendToCareCenter = 3,
  ElderlyWaiting = 4,
  ElderlyAllocated = 5,
  ElderlyTakingCare = 6,
  ElderlyCareCenterReturned = 7,
  ElderlyDied = 14, /// xalit 14 bolgow darhaa axaas asuuna ug n 8 bsan
  ReturnSum = 9,
  MovingCarecenter = 11,
  OwnRequestCarecenter = 12,
  WaitDistrict = 10,
  UserForce = 13,
}
