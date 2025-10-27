import { Flex } from "antd";

type Props = {
  data?: {
    currentFirst?: number;
    currentSecond?: number;
  }[];
};
export const HorizontalChart = ({ data }: Props) => {
  return (
    <div className="space-y-[12px]">
      {data?.map((el, key) => {
        const total = (el.currentFirst || 0) + (el.currentSecond || 0);
        const percentOne =
          (total || 0) > 0 ? ((el.currentFirst || 0) / (total || 0)) * 100 : 0;
        const percentTwo =
          (total || 0) > 0 ? ((el.currentSecond || 0) / (total || 0)) * 100 : 0;

        return (
          <Flex key={key} justify="center">
            <div
              style={{
                width: `100%`,
              }}
              className="h-6 relative"
            >
              <div className="flex items-center gap-2 justify-end">
                <div className="">{el?.currentFirst || ""}</div>
                <div
                  className="h-6   right-0  gap-2"
                  style={{
                    backgroundColor: "#69C0FF",
                    width: `${percentOne}%`,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                width: `100%`,
              }}
              className="h-6 relative"
            >
              <div className="h-6  flex justify-start items-center w-full gap-2">
                <div
                  className="h-6"
                  style={{
                    backgroundColor: "#FF7875",
                    width: `${percentTwo}%`,
                  }}
                />
                <div>{el?.currentSecond || ""}</div>
              </div>
            </div>
          </Flex>
        );
      })}
    </div>
  );
};
