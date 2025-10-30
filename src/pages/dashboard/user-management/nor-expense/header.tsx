import { HistoryOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { PageCard } from "components/card";
import { CardSelect } from "components/card-select";
import { useAtom } from "jotai";
import { useState } from "react";
import { InfoType } from "service/finance/type";
import { dateFormat, moneyFormat } from "utils/index";
import { AddBudget } from "./action/add_budge";
import { UpdateBudget } from "./action/update_budge";
import { storeNorExpense } from "./store";
import { HistoryBudget } from "./action/history_budge";

type Props = {
  data?: InfoType;
};
export const Header = ({ data }: Props) => {
  const [store, setStore] = useAtom(storeNorExpense);
  const [addBudget, setAddBudget] = useState<boolean>();
  const [historyBudge, setHistoryBudge] = useState<any>();
  const [updateBudget, setUpdateBudget] = useState<any>();

  return (
    <>
      <PageCard>
        <Flex align="center" wrap="wrap" gap={24}>
          <CardSelect
            label={"Он"}
            options={[
              { label: "2021", value: 2021 },
              { label: "2022", value: 2022 },
              { label: "2023", value: 2023 },
              { label: "2024", value: 2024 },
            ]}
            value={store.year}
            onChange={(value) => setStore({ ...store, year: value })}
          />
          <CardSelect
            label={"Сар"}
            options={[
              ...Array.from({ length: 12 }, (_, i) => ({
                label: `${i + 1}`,
                value: i + 1,
              })),
            ]}
            placeHolder="Бүгд"
            value={store.month}
            onChange={(value) => setStore({ ...store, month: value })}
          />

          <Item label="Жилийн батлагдсан төсөв" value={data?.year_budget} />
          <Item label="Норматив зардал" value={data?.expense} />
          <Item label="Сүүлд шинэчилсэн" value={data?.update_at} />

          <Flex align="center" className=" xl:flex-1" justify="end" gap={16}>
            <Button
              icon={<HistoryOutlined rev />}
              size="large"
              onClick={() => setHistoryBudge(data && data?.id)}
            />
            {data?.year_budget ? (
              <Button
                className="md:flex items-center font-medium gap-1 mr-4 col-span-1"
                icon={<SettingOutlined rev />}
                type="primary"
                size="large"
                onClick={() => setUpdateBudget(data && data?.id)}
              >
                Төсөв засах
              </Button>
            ) : (
              <Button
                className="md:flex items-center font-medium gap-1 mr-4 col-span-1"
                icon={<SettingOutlined rev />}
                type="primary"
                size="large"
                onClick={() => setAddBudget(true)}
              >
                Төсөв нэмэх
              </Button>
            )}
          </Flex>
        </Flex>
      </PageCard>

      {/* Modal */}
      <AddBudget
        data={addBudget}
        onCancel={() => setAddBudget(false)}
        onFinish={async () => {
          setStore({ ...store });
          setAddBudget(false);
        }}
      />
      {updateBudget && (
        <UpdateBudget
          data={updateBudget}
          onCancel={() => setUpdateBudget(undefined)}
          onFinish={async () => {
            setStore({ ...store });
            setUpdateBudget(false);
          }}
        />
      )}
      {historyBudge && (
        <HistoryBudget
          data={historyBudge}
          onCancel={() => setHistoryBudge(undefined)}
          onFinish={async () => {
            setHistoryBudge(false);
          }}
        />
      )}
    </>
  );
};

type ItemProps = {
  label?: string;
  value?: number | Date;
};
const Item = ({ label, value }: ItemProps) => {
  return (
    <Flex align="center" gap={8}>
      <div className="text-gray-500 font-medium ">{label} :</div>
      <div className="text-gray-900 font-medium">
        {typeof value === "number"
          ? moneyFormat(value, "mnt")
          : dateFormat(value)}
      </div>
    </Flex>
  );
};
