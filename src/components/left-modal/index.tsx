import LeftDetail from "components/detail-modal/left-detail";
import moment from "moment";

export const LeftItemsDetail = ({ list, rest }: any) => {
  const detailPromt = [
    {
      name: "Ургийн овог:",
      value: list?.data?.elderly.family_name,
    },
    {
      name: "Регистрийн дугаар:",
      value: list?.data?.elderly.rd,
    },
    {
      name: "Төрсөн огноо:",
      value: moment(list?.data?.elderly?.birth_date).format("YYYY/MM/DD"),
    },
    {
      name: "Нас:",
      value: list?.data?.elderly.age,
    },
    {
      name: "Хүйс:",
      value: list?.data?.elderly?.gender === 0 ? "Эрэгтэй" : "Эмэгтэй",
    },
    {
      name: "Гэрлэлтийн байдал:",
      value: list?.data?.elderly?.marriage,
    },
    {
      name: "Ам бүл",
      value: list?.data?.elderly?.family_count,
    },
    {
      name: "Хүүхдийн тоо:",
      value: list?.data?.elderly?.children_count,
    },
    {
      name: "Асруулж байгаа шалтгаан:",
      value: list?.data?.elderly?.reason,
    },
    {
      name: "Хөгжлийн бэрхшээлтэй эсэх:",
      value: list?.data?.elderly?.is_disability ? "Тийм" : "Үгүй",
    },
    {
      name: "Онош, ХЧА-ын хувь:",
      value: list?.data?.elderly.disability_percent + "%",
    },
  ];

  {
    list?.data?.elderly?.is_disability &&
      detailPromt.push({
        name: "Хөгжлийн бэрхшээл",
        value: list?.data?.elderly?.disability_types
          ?.map((item: any) => item.name)
          .join(", "),
      });
  }

  const addressInfo = [
    {
      name: "Аймаг / Нийслэл",
      value: list?.data?.elderly?.address?.city?.name,
    },
    {
      name: "Сум /Дүүрэг",
      value: list?.data?.elderly?.address?.district?.name,
    },
    {
      name: "Баг / Хороо",
      value: list?.data?.elderly?.address?.khoroo?.name,
    },
    {
      name: "Гудамж / Хороолол",
      value: list?.data?.elderly?.address?.street,
    },
    {
      name: "Хашаа / Хаалганы дугаар",
      value: list?.data?.elderly?.address?.description,
    },
  ];

  const leftitems = [
    {
      key: "1",
      label: <div className="font-semibold text-base">Хувийн мэдээлэл</div>,
      children: (
        <div>
          {detailPromt?.map((item, index) => {
            return (
              <div
                key={index}
                className="mb-4 pt-0 mt-0 w-full flex justify-between"
              >
                <div className="text-[#475467] mt-2 col-span-1 font-normal w-[60%] text-base">
                  {item.name}
                </div>
                <div className="font-semibold  mt-2 w-[40%]">{item.value}</div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "2",
      label: <div className="font-semibold text-base">Оршин суугаа хаяг</div>,
      children: (
        <div>
          {addressInfo?.map((item, index) => {
            return (
              <div
                key={index}
                className="mb-4 pt-0 mt-0 w-full flex justify-between"
              >
                <div className="text-[#475467] mt-2 col-span-1 font-normal w-[60%] text-base">
                  {item.name}
                </div>
                <div className="font-semibold  mt-2 w-[40%]">{item.value}</div>
              </div>
            );
          })}
        </div>
      ),
    },
  ];
  return (
    <LeftDetail
      items={leftitems}
      last_name={rest?.detail?.elderly?.last_name}
      first_name={rest?.detail?.elderly?.first_name}
      avatar={rest?.detail?.elderly?.profile?.physical_path}
    />
  );
};
