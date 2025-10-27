import { CardSelect } from "components/card-select";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React from "react";
import HalfYear from "./component/halfyear";
import Monthly from "./component/monthly";
import { reportForm } from "./store";

const ReportDetail: React.FC = () => {
  const [form, setForm] = useAtom(reportForm);
  return (
    <div className="mt-4 space-y-5">
      <CardSelect
        label={"Тайлан он"}
        onChange={(e) => setForm({ ...form, year: e })}
        value={form.year}
        options={Array.from({ length: dayjs().year() - 1999 }, (_, i) => ({
          label: `${dayjs().year() - i}`,
          value: dayjs().year() - i,
        }))}
      />

      <Monthly />
      <div className="mt-5">
        <HalfYear />
      </div>
    </div>
  );
};

export default ReportDetail;
