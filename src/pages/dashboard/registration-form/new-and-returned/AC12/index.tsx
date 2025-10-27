import { ProFormInstance, StepsForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Form, Spin, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import register_form from "service/registration-form";
import Expense from "./expense";
import Income from "./income";
import MovingProperty from "./moving-property";
import RealState from "./real-state";
import checkSvg from "assets/icons/check1.svg";
import finishCircle from "assets/icons/finish-circle.svg";
import waitCircle from "assets/icons/wait-circle.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { GETAC12TYPE } from "service/registration-form/types";

const AC12: React.FC<any> = ({ setOnSendRequest, setProcess }) => {
  const formRef = useRef<ProFormInstance>();
  const [form] = Form.useForm();
  const values: GETAC12TYPE = Form.useWatch([], form);
  const [current, setCurrent] = useState(0);

  const filledValues = Object.values({
    ...values,
    ...values?.expenses,
    ...values?.income,
    ...values?.movable_assets,
    ...values?.real_estate,
  }).reduce((pre: number, curr) => (!!curr ? pre + 1 : pre), 0);

  setProcess((filledValues * 100) / 22);

  const createAC12 = useRequest(register_form.documentAC12, {
    manual: true,
    onSuccess() {
      setOnSendRequest(true);
      notification.success({
        message: "Амжилттай",
      });
    },
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  const getAC12 = useRequest(register_form.getdocumentAC12, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  const sum =
    (getAC12?.data?.real_estate?.equipment ?? 0) +
    (getAC12?.data?.real_estate?.furniture ?? 0) +
    (getAC12?.data?.real_estate?.land ?? 0) +
    (getAC12?.data?.real_estate?.non_residential ?? 0) +
    (getAC12?.data?.real_estate?.residential ?? 0);

  useEffect(() => {
    getAC12.runAsync();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...getAC12,
      income: {
        sales_revenue: getAC12?.data?.income?.sales_revenue,
        subsidy_from_government: getAC12?.data?.income?.subsidy_from_government,
        non_core: getAC12?.data?.income?.non_core,
        other: getAC12?.data?.income?.other,
        total: getAC12?.data?.income?.total,
      },
      expenses: {
        raw_materials: getAC12?.data?.expenses?.raw_materials,
        goods_purchased_for_sale:
          getAC12?.data?.expenses?.goods_purchased_for_sale,
        service: getAC12?.data?.expenses?.service,
        salary: getAC12?.data?.expenses?.salary,
        other: getAC12?.data?.expenses?.other,
        taxes_and_fees: getAC12?.data?.expenses?.taxes_and_fees,
        total: getAC12?.data?.expenses?.total,
        profit_and_loss: getAC12?.data?.expenses?.profit_and_loss,
      },
      real_estate: {
        residential: getAC12?.data?.real_estate?.residential ?? 0,
        non_residential: getAC12?.data?.real_estate?.non_residential,
        land: getAC12?.data?.real_estate?.land,
        equipment: getAC12?.data?.real_estate?.equipment,
        furniture: getAC12?.data?.real_estate?.furniture,
      },
      movable_assets: {
        vehicles_equipment: getAC12?.data?.movable_assets?.vehicles_equipment,
        supply_materials: getAC12?.data?.movable_assets?.supply_materials,
        bed: getAC12?.data?.movable_assets?.bed,
        table: getAC12?.data?.movable_assets?.table,
        chair: getAC12?.data?.movable_assets?.chair,
        animal: getAC12?.data?.movable_assets?.animal,
      },
    });
  }, [getAC12?.data]);

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
      {getAC12.loading ? (
        <Spin />
      ) : (
        <StepsForm<{
          name: string;
        }>
          formRef={formRef}
          onFinish={async (values) => {
            createAC12.runAsync({
              ...values,
            });
          }}
          current={current}
          formProps={{
            validateMessages: {
              required: "Заавал бөглөх хэрэгтэй",
            },
            form,
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
                        onClick={handleClickNext}
                        className="flex justify-center items-center gap-2"
                      >
                        Үргэжлүүлэх
                        <FaArrowRight />
                      </Button>
                    </div>
                  )}
                  {step === 2 && (
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
                        onClick={handleClickNext}
                        className="flex justify-center items-center gap-2"
                      >
                        Үргэжлүүлэх
                        <FaArrowRight />
                      </Button>
                    </div>
                  )}
                  {step === 3 && (
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
          stepsFormRender={(form, submitter) => {
            return (
              <div className="">
                {form}
                <div className="">{submitter}</div>
              </div>
            );
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
        >
          <StepsForm.StepForm
            name="income"
            stepProps={{
              description: (
                <div className="mt-2 ml-8 text-base font-semibold ">Орлого</div>
              ),
            }}
            onFinish={async (values) => {
              return true;
            }}
          >
            <Income />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            initialValues={{}}
            name="expenses"
            stepProps={{
              description: (
                <div className="mt-2 ml-7 text-base font-semibold">Зарлага</div>
              ),
            }}
            onFinish={async (values) => {
              return true;
            }}
          >
            <Expense />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            initialValues={{}}
            name="real_estate"
            stepProps={{
              description: (
                <div className="mt-2 text-base font-semibold">
                  Үл хөдлөх хөрөнгө
                </div>
              ),
            }}
            onFinish={async (values) => {
              return true;
            }}
          >
            <RealState />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            initialValues={{}}
            name="movable_assets"
            stepProps={{
              description: (
                <div className="mt-2 text-base font-semibold">
                  Хөдлөх хөрөнгө
                </div>
              ),
            }}
            onFinish={async (values) => {
              return true;
            }}
          >
            <MovingProperty />
          </StepsForm.StepForm>
        </StepsForm>
      )}
    </div>
  );
};

export default AC12;
