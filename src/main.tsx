import { ProAliasToken, ProConfigProvider } from "@ant-design/pro-provider";
import { ConfigProvider as AntdConfigProvider, notification } from "antd";
import mnMN from "antd/lib/locale/mn_MN";
import { AuthProvider } from "context/auth";
import dayjs from "dayjs";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import "./styles/global.less";
import "./styles/tailwind.css";

const domNode = document.getElementById("root") as any;
const root = createRoot(domNode);

const proMNLocale = {
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

const localeObject = {
  name: "mn",
  weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
  // month:
  //   "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split(
  //     "_"
  //   ),
  weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"),
  month:
    "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split(
      "_"
    ),
  weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),
  ordinal: function (_: any) {
    return _;
  },
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "YYYY оны MMMMын D",
    LLL: "YYYY оны MMMMын D HH:mm",
    LLLL: "dddd, YYYY оны MMMMын D HH:mm",
  },
  relativeTime: {
    future: "%s дараа",
    past: "%s өмнө",
    s: "саяхан",
    m: "минутын",
    mm: "%d минутын",
    h: "1 цагийн",
    hh: "%d цагийн",
    d: "1 өдрийн",
    dd: "%d өдрийн",
    M: "1 сарын",
    MM: "%d сарын",
    y: "1 жилийн",
    yy: "%d жилийн",
  },
};

const themeToken = {
  colorPrimary: "#6759CE",
  fontFamily: "Inter",
  fontSize: 14,
  colorBorder: "#D0D5DD",
  boxShadow: "0 0 0 rgba(3, 9, 21, 0.5)",
} as unknown as Partial<ProAliasToken>;

dayjs.locale(localeObject);

notification.config({
  placement: "topRight",
});
root.render(
  <AntdConfigProvider
    locale={mnMN}
    theme={{
      token: themeToken,
      // token: {
      //   colorPrimary: "#6759CE",
      //   fontFamily: "Inter",
      //   colorBorder: "#D0D5DD",
      // },
    }}
  >
    <ProConfigProvider token={themeToken}>
      <AuthProvider>
        <BrowserRouter basename="/xmeta">
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </ProConfigProvider>
  </AntdConfigProvider>
);
