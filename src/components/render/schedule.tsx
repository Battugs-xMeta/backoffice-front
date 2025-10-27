import dayjs from "dayjs";
import React from "react";
import { capitalizate } from "utils/index";

export const RenderServiceSchedule = ({ hours }: any) => {
  return (
    <div>
      {hours?.map((el, index) => (
        <div
          className="flex items-center gap-1 text-gray-600"
          key={"time-table-" + index}
        >
          <div>{el?.week_days?.map((el) => capitalizate(el))?.join("-")}</div>
          <div>
            {dayjs(el?.opening).format("HH:mm")}-
            {dayjs(el?.closing).format("HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
};
