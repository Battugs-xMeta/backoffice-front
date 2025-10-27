import { PageCard } from "components/card";
import dayjs from "dayjs";
import { moneyFormat } from "utils/index";

type Item = {
  label: string;
  value?: any;
  type?: "DATE" | "STRING" | "ENUM";
  enums?: any;
  items?: Item[];
  render?: (value: any) => any;
  isMoney?: boolean;
  prefix?: string;
};
type Props = {
  title?: string;
  items: Item[];
  data?: any;
};

export const StaticCard = ({ title, items, data }: Props) => {
  const getValue = (item?: any): any | undefined => {
    if (typeof item?.value === "string") return data?.[item.value];
    if (typeof item?.value === "object" && Array.isArray(item?.value)) {
      return item.value?.reduce(
        (acc: any, key: any) =>
          acc && acc?.[key]
            ? item.value === "DATE"
              ? dayjs(acc?.[key]).format("YYYY-MM-DD")
              : acc?.[key]
            : null,
        data
      );
    }
    return undefined;
  };
  const isGroup = items.some((item) => item.items);

  return (
    <PageCard className="bg-primary-6 p-6 border-0 shadow-none ">
      <div className="text-gray-700 font-semibold">{title}</div>
      {isGroup && (
        <div>
          {items.map((item, key) => {
            return (
              <div className=" bg-white p-6 rounded-2xl  mt-4" key={key}>
                <div className="text-gray-900 font-medium">{item.label}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                  {item?.items?.map((el, key) => {
                    const value = getValue(el);
                    return <StatItem key={key} {...el} value={value} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!isGroup && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4`}
        >
          {items.map((item, index) => {
            const value = getValue(item);
            return <StatItem {...item} value={value} key={index} />;
          })}
        </div>
      )}
    </PageCard>
  );
};

export const StatItem = ({
  value,
  label,
  type,
  enums,
  render,
  isMoney,
  prefix,
}: Item) => {
  return (
    <div className="space-y-2">
      <div className=" text-gray-600 font-light text-sm">{label}</div>
      <div className="text-gray-900 font-semibold text-sm">
        {type === "DATE" &&
          (render ? render(value) : dayjs(value).format("YYYY-MM-DD"))}
        {(type === "STRING" || !type) &&
          (render
            ? render(value)
            : isMoney
            ? moneyFormat(value)
            : `${value || "-"} ${prefix ? prefix : ""}`)}
        {type === "ENUM" &&
          (render
            ? render(value)
            : enums.find((el: any) => el.value === value)?.label)}
      </div>
    </div>
  );
};
