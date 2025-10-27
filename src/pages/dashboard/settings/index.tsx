import ProForm, { ProFormInstance, ProFormItem } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import {
  Button,
  Card,
  Col,
  Flex,
  Row,
  Switch,
  TimePicker,
  notification,
} from "antd";
import dayjs from "dayjs";
import { FC, useRef, useState } from "react";
import timeScheduleService from "service/time-schedule";

const sevenDaysForm = [
  {
    name: "monday",
    label: "Даваа гараг",
    // rules: FORM_ITEM_RULE(),
  },
  {
    name: "tuesday",
    label: "Мягмар гараг",
    // rules: FORM_ITEM_RULE(),
  },
  {
    name: "wednesday",
    label: "Лхагва гараг",
    // rules: FORM_ITEM_RULE(),
  },
  {
    name: "thursday",
    label: "Пүрэв гараг",
    // rules: FORM_ITEM_RULE(),
  },
  {
    name: "friday",
    label: "Баасан гараг",
    // rules: FORM_ITEM_RULE(),
  },
  {
    name: "saturday",
    label: "Бямба гараг",
    // rules: FORM_ITEM_RULE(),
  },
  {
    name: "sunday",
    label: "Ням гараг",
    // rules: FORM_ITEM_RULE(),
  },
];

const SettingsPage: FC = () => {
  const [restDayArray, setRestDayArray] = useState<string[]>([]);
  const [datesFormatted, setDatesFormatted] = useState<any>({});
  const formRef = useRef<ProFormInstance>(null);

  const get = useRequest(timeScheduleService.get, {
    onSuccess: (res) => {
      formRef.current?.setFieldsValue({
        monday: (res || []).length > 0 &&
          !res[0].is_rest_day && [
            dayjs(res[0].start_time, "HH:mm"),
            dayjs(res[0].end_time, "HH:mm"),
          ],
        is_rest_day_monday: res.find((x) => x.day === 0)?.is_rest_day,
        tuesday: (res || []).length > 1 &&
          !res[1].is_rest_day && [
            dayjs(res[1].start_time, "HH:mm"),
            dayjs(res[1].end_time, "HH:mm"),
          ],
        is_rest_day_tuesday: res.find((x) => x.day === 1)?.is_rest_day,
        wednesday: (res || []).length > 2 &&
          !res[2].is_rest_day && [
            dayjs(res[2].start_time, "HH:mm"),
            dayjs(res[2].end_time, "HH:mm"),
          ],
        is_rest_day_wednesday: res.find((x) => x.day === 2)?.is_rest_day,
        thursday: (res || []).length > 3 &&
          !res[3].is_rest_day && [
            dayjs(res[3].start_time, "HH:mm"),
            dayjs(res[3].end_time, "HH:mm"),
          ],
        is_rest_day_thursday: res.find((x) => x.day === 3)?.is_rest_day,
        friday: (res || []).length > 4 &&
          !res[4].is_rest_day && [
            dayjs(res[4].start_time, "HH:mm"),
            dayjs(res[4].end_time, "HH:mm"),
          ],
        is_rest_day_friday: res.find((x) => x.day === 4)?.is_rest_day,
        saturday: (res || []).length > 5 &&
          !res[5].is_rest_day && [
            dayjs(res[5].start_time, "HH:mm"),
            dayjs(res[5].end_time, "HH:mm"),
          ],
        is_rest_day_saturday: res.find((x) => x.day === 5)?.is_rest_day,
        sunday: (res || []).length > 6 &&
          !res[6].is_rest_day && [
            dayjs(res[6].start_time, "HH:mm"),
            dayjs(res[6].end_time, "HH:mm"),
          ],
        is_rest_day_sunday: res.find((x) => x.day === 6)?.is_rest_day,
      });

      let tmp: any = {};
      res.map((i) => {
        if (!i.is_rest_day) {
          tmp[sevenDaysForm[i.day].name] = [i.start_time, i.end_time];
        }
      });

      setDatesFormatted(tmp);
    },
  });

  const save = useRequest(timeScheduleService.save, {
    manual: true,
    onSuccess: (res) => {
      notification.success({
        message: "Амжилттай хадгаллаа",
      });
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  return (
    <Card className="mt-5" title={"Цагийн хуваарь"}>
      <ProForm
        formRef={formRef}
        className="gap-x-4 gap-y-0"
        onFinish={async (values) => {
          const daysArray = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ];

          values.time_schedules = Array.from({ length: 7 }, (_, i) => {
            const time = datesFormatted[daysArray[i]];

            if (time === undefined) {
              return {
                day: i,
                is_rest_day: true,
              };
            }
            if (time[0] === null && time[1] === null) {
              return {
                day: i,
                is_rest_day: true,
              };
            }
            return {
              day: i,
              start_time: time[0],
              end_time: time[1],
              is_rest_day: false,
            };
          });

          save.run(values);
        }}
        submitter={{
          render: ({ submit: onSubmit }) => {
            return (
              <div className="w-full flex justify-end mt-3 gap-2 text-end float-right">
                <div className="flex justify-end ">
                  <Button
                    type="primary"
                    onClick={() => {
                      if (onSubmit) onSubmit();
                    }}
                    // onClick={() => {
                    //   if (onSubmit) {
                    //     onSubmit();
                    //   }
                    // }}
                    loading={save.loading}
                    className="flex justify-center items-center gap-2"
                  >
                    Хадгалах
                  </Button>
                </div>
              </div>
            );
          },
        }}
      >
        <Row gutter={20}>
          {sevenDaysForm.map((item, index) => (
            <Col xxl={4} xl={6} lg={8} md={8} sm={12} xs={24} key={item.name}>
              <ProFormItem
                name={item.name}
                className="timeschedule"
                style={{ width: "100%" }}
                label={
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{ width: "100%" }}
                  >
                    <div className="text-md font-bold">{item.label}</div>
                    <div className="flex align-middle gap-1">
                      <div className="m-auto italic">Амарна</div>
                      <ProFormItem
                        name={`is_rest_day_${item.name}`}
                        style={{ margin: 0 }}
                      >
                        <Switch
                          size="small"
                          onChange={(checked) => {
                            setRestDayArray((prev) =>
                              checked
                                ? [...prev, item.name]
                                : prev.filter(
                                    (restDay) => restDay !== item.name
                                  )
                            );
                          }}
                          checked={formRef.current?.getFieldValue(
                            `is_rest_day_${item.name}`
                          )}
                        />
                      </ProFormItem>
                    </div>
                  </Flex>
                }
              >
                <TimePicker.RangePicker
                  placeholder={["Нээх цаг", "Хаах цаг"]}
                  format="HH:mm"
                  style={{ width: "100%" }}
                  disabled={restDayArray.includes(item.name)}
                  onChange={(_, string) => {
                    setDatesFormatted((prev: any) => {
                      return {
                        ...prev,
                        [item.name]: string,
                      };
                    });
                  }}
                />
              </ProFormItem>
            </Col>
          ))}
        </Row>
      </ProForm>
    </Card>
  );
};

export default SettingsPage;
