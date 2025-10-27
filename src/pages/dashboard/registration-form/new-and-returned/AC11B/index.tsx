import { ProFormInstance, StepsForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Form, Spin, notification } from "antd";
import checkSvg from "assets/icons/check1.svg";
import finishCircle from "assets/icons/finish-circle.svg";
import waitCircle from "assets/icons/wait-circle.svg";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import register_form from "service/registration-form";
import {
  AC11BTYPE,
  Building,
  GETAC11TYPE,
} from "service/registration-form/types";
import BuildingsFacilities from "./buildings-facilities";
import Maintenance from "./is-maintenance";

const AC11B = ({
  setCurrentAdd,
  setProcess,
}: {
  setCurrentAdd: Function;
  setProcess: Function;
}) => {
  const formRef = useRef<ProFormInstance>();
  const [form] = Form.useForm();
  const values: GETAC11TYPE = Form.useWatch([], form);
  const [current, setCurrent] = useState(0);
  const buildingArray: Building = values?.buildings?.[0];

  const filledValues = Object.values({
    ...values,
    ...buildingArray,
    ...buildingArray?.maintenance,
    ...buildingArray?.pit_toilet,
    ...buildingArray?.area,
    ...buildingArray?.toilet,
    ...values?.equipment,
  }).reduce((pre: number, curr) => (!!curr ? pre + 1 : pre), 0);

  setProcess((filledValues * 100) / 50);
  const createAC11B = useRequest(register_form.documentAC11B, {
    manual: true,
    onSuccess() {
      notification.success({
        message: "Амжилттай",
      });
      setCurrentAdd("3");
    },
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  const getAC11B = useRequest(register_form.getDocumentAC11B, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    getAC11B.runAsync();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...getAC11B,
      buildings: getAC11B?.data?.buildings?.map((building) => {
        return {
          ...building,
          full_address: building?.full_address,
          date_of_construction: building?.date_of_construction,
          area: {
            ...building?.area,
          },
          toilet: {
            ...building?.toilet,
          },
          pit_toilet: {
            ...building?.pit_toilet,
          },
          maintenance: {
            ...building?.maintenance,
          },
        };
      }),
      equipment: {
        bus_count: getAC11B?.data?.equipment?.bus_count,
        car_count: getAC11B?.data?.equipment?.car_count,
        company_owned_count: getAC11B?.data?.equipment?.company_owned_count,
        is_have_vehicles: getAC11B?.data?.equipment?.is_have_vehicles,
        motorcycle_count: getAC11B?.data?.equipment?.motorcycle_count,
        other_owned_count: getAC11B?.data?.equipment?.other_owned_count,
        special_purpose_count: getAC11B?.data?.equipment?.special_purpose_count,
        truck_count: getAC11B?.data?.equipment?.truck_count,
      },
      bed_count: getAC11B?.data?.bed_count,
      table_count: getAC11B?.data?.table_count,
      chair_count: getAC11B?.data?.chair_count,
      computer_count: getAC11B?.data?.computer_count,
      animal_count: getAC11B?.data?.animal_count,
    });
  }, [getAC11B?.data]);

  const handleClickNext = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch((err) => console.log(err));
  };

  const handleClickPrev = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current - 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="custom-antd-step-form w-full">
      {getAC11B.loading ? (
        <Spin />
      ) : (
        <StepsForm
          formProps={{
            validateMessages: {
              required: "Заавал бөглөх хэрэгтэй",
            },
            form,
          }}
          current={current}
          formRef={formRef}
          onFinish={async (value: AC11BTYPE) => {
            createAC11B.runAsync({
              ...value,
              buildings: value?.buildings.map((el) => ({
                ...el,
                date_of_construction: dayjs(el.date_of_construction).toDate(),
                maintenance: {
                  ...el.maintenance,
                  ...(el.maintenance.date_of_major_renovation && {
                    date_of_major_renovation: dayjs(
                      el.maintenance.date_of_major_renovation
                    ).toDate(),
                  }),
                  ...(el.maintenance.date_of_maintenance && {
                    date_of_maintenance: dayjs(
                      el.maintenance.date_of_maintenance
                    ).toDate(),
                  }),
                },
              })),
            });
          }}
          stepsProps={{
            progressDot: (icon, { index, status }) => {
              switch (status) {
                case "finish":
                  return (
                    <div className="bg-[#F5F8F8] rounded-full w-6 h-6 ">
                      <img src={checkSvg} alt="check" />
                    </div>
                  );
                case "wait":
                  return (
                    <div className="bg-[#F9FAFB] rounded-full w-6 h-6">
                      <div className="bg-[#F9FAFB] rounded-full w-full h-full">
                        <img src={waitCircle} alt="finishCircle" />
                      </div>
                    </div>
                  );
                case "process":
                  return (
                    <div className="bg-[#F5F8F8] rounded-full w-6 h-6">
                      <div className="bg-[#F5F8F8] rounded-full w-full h-full">
                        <img src={finishCircle} alt="finishCircle" />
                      </div>
                    </div>
                  );
              }
            },
          }}
          stepsFormRender={(form, submitter) => {
            return (
              <div className="">
                {form}
                <div className="">{submitter}</div>
              </div>
            );
          }}
          submitter={{
            submitButtonProps: {
              className: "flex justify-end items-center gap-2 w-full",
            },
            render: ({ step, onSubmit, onPre }) => {
              return (
                <div className="flex justify-end mt-3 gap-2 text-end">
                  {step === 0 && (
                    <div className="flex justify-end">
                      <Button
                        type="primary"
                        onClick={handleClickNext}
                        className="flex justify-center items-center gap-2"
                      >
                        Үргэжлүүлэх
                        <FaArrowRight />
                      </Button>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="flex justify-end gap-2">
                      <Button
                        type="default"
                        onClick={handleClickPrev}
                        className="flex justify-center items-center gap-2"
                      >
                        <FaArrowLeft />
                        Буцах
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          if (onSubmit) {
                            onSubmit();
                          }
                        }}
                        className="flex justify-center items-center gap-2"
                      >
                        <IoIosSave />
                        Хадгалах
                      </Button>
                    </div>
                  )}
                </div>
              );
            },
          }}
        >
          <StepsForm.StepForm
            stepProps={{
              description: (
                <div className="mt-2 text-base font-semibold">
                  Барилга байгууламжийн үзүүлэлт
                </div>
              ),
            }}
            onFinish={async (values) => {
              return true;
            }}
          >
            <BuildingsFacilities />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            stepProps={{
              description: (
                <div className="mt-2 text-base font-semibold">
                  Тоног төхөөрөмж
                </div>
              ),
            }}
            onFinish={async (values) => {
              return true;
            }}
          >
            <Maintenance />
          </StepsForm.StepForm>
        </StepsForm>
      )}
    </div>
  );
};

export default AC11B;
