import { ProFormInstance, StepsForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Form, Spin, notification } from "antd";
import checkSvg from "assets/icons/check1.svg";
import finishCircle from "assets/icons/finish-circle.svg";
import waitCircle from "assets/icons/wait-circle.svg";
import { PROPERTY_TYPE, RESPONSIBILITY_TYPE } from "config";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import file from "service/file";
import register_form from "service/registration-form";
import { AC11ATYPE } from "service/registration-form/types";
import AddressOfEnterprise from "./address-enterprise";
import ContactPerson from "./contact-person";
import ResponsibilityType from "./responsibility-type";

const AC11A = ({
  setCurrentAdd,
  setProcess,
}: {
  setCurrentAdd: Function;
  setProcess: Function;
}) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const formRef = useRef<ProFormInstance>();
  const values = Form.useWatch([], form);

  const createAC11A = useRequest(register_form.documentAC11A, {
    manual: true,
    onSuccess() {
      notification.success({
        message: "Амжилттай",
      });
      setCurrentAdd("2");
    },
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  const getAC11A = useRequest(register_form.getDocumentAC11A, {
    manual: true,
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  const filledValues = Object.values({
    ...values,
    ...values?.payment,
  }).reduce((pre: number, curr) => (!!curr ? pre + 1 : pre), 0);

  useEffect(() => {
    getAC11A.runAsync();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...getAC11A,
      company_rd: getAC11A?.data?.company_rd,
      city_id: getAC11A?.data?.city_id,
      district_id: getAC11A?.data?.district_id,
      khoroo_id: getAC11A?.data?.khoroo_id,
      street: getAC11A?.data?.street,
      building: getAC11A?.data?.building,
      door_number: getAC11A?.data?.door_number,
      phone_number: getAC11A?.data?.phone_number,
      email: getAC11A?.data?.email,
      website: getAC11A?.data?.website,
      facebook: getAC11A?.data?.facebook,
      logo_id: [
        {
          url: file.fileToUrl(getAC11A?.data?.logo?.physical_path as string),
          id: getAC11A?.data?.logo?.id as any,
          name: getAC11A?.data?.logo?.original_name,
          size: getAC11A?.data?.logo?.file_size,
          uid: `${getAC11A?.data?.logo?.id}`,
          type: getAC11A?.data?.logo?.extention,
        },
      ],
      ...getAC11A,
      start_date: getAC11A?.data?.start_date,
      responsibility_type:
        getAC11A?.data?.responsibility_type === 0
          ? RESPONSIBILITY_TYPE[0].value
          : getAC11A?.data?.responsibility_type,
      property_type:
        getAC11A?.data?.property_type === 0
          ? PROPERTY_TYPE[0].value
          : getAC11A?.data?.property_type,
      possible_people_number: getAC11A?.data?.possible_people_number,
      bed_count: getAC11A?.data?.bed_count,
      table_count: getAC11A?.data?.table_count,
      chair_count: getAC11A?.data?.chair_count,
      contact_last_name: getAC11A?.data?.contact_last_name,
      contact_first_name: getAC11A?.data?.contact_first_name,
      contact_position: getAC11A?.data?.contact_position,
      contact_phone_number: getAC11A?.data?.contact_phone_number,
      contact_email: getAC11A?.data?.contact_email,
      payment: {
        account_number: getAC11A?.data?.payment?.account_number,
        bank_name: getAC11A?.data?.payment?.bank_name,
        receiver_name: getAC11A?.data?.payment?.receiver_name,
        address_detail: getAC11A?.data?.payment?.address_detail,
      },
    });
  }, [getAC11A?.data]);

  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  setProcess((filledValues * 100) / 29);

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
      {getAC11A.loading ? (
        <Spin />
      ) : (
        <StepsForm
          formProps={{
            validateMessages: {
              required: "Заавал бөглөх хэрэгтэй",
            },
            form,
          }}
          formRef={formRef}
          onFinish={async (value: AC11ATYPE) => {
            if (value?.logo_id[0]?.uid.includes("rc-upload")) {
              if (value.logo_id && value.logo_id.length > 0) {
                value.logo_id = await upload
                  .runAsync({
                    file: value.logo_id[0].originFileObj,
                  })
                  .then((el: any) => el.map((el: any) => el.id));
              }
              if (
                await createAC11A.runAsync({
                  ...value,
                  start_date: dayjs(value.start_date).toDate(),
                  latitude: value?.location?.[0].toString(),
                  longitude: value?.location?.[1].toString(),
                  logo_id: value?.logo_id?.[0],
                  payment: {
                    ...value.payment,
                    latitude: value?.pay_location?.[0].toString(),
                    longitude: value?.pay_location?.[1].toString(),
                  },
                })
              ) {
                return true;
              }
            }
            createAC11A.runAsync({
              ...value,
              start_date: dayjs(value.start_date).toDate(),
              latitude: value?.location?.[0].toString(),
              longitude: value?.location?.[1].toString(),
              logo_id: value?.logo_id?.[0].id,
              payment: {
                ...value.payment,
                latitude: value?.pay_location?.[0].toString(),
                longitude: value?.pay_location?.[1].toString(),
              },
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
            onChange: (value) => {
              setCurrent(value);
            },
          }}
          current={current}
          stepsFormRender={(form, submitter) => {
            return (
              <div className="">
                {form}
                <div className=" mb-10">{submitter}</div>
              </div>
            );
          }}
          submitter={{
            render: ({ step, onSubmit, onPre, form }) => {
              return (
                <div className="w-full flex justify-end mt-3 gap-2 text-end float-right">
                  {step === 0 && (
                    <div className="flex justify-end ">
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
                        loading={createAC11A.loading}
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
                <div className="mt-2 text-base font-semibold ">
                  Аж ахуйн нэгж, байгууллагын хаяг
                </div>
              ),
            }}
          >
            <AddressOfEnterprise formRef={formRef} detail={getAC11A?.data} />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            stepProps={{
              description: (
                <div className="mt-2 text-base font-semibold mr-6">
                  Хариуцлагын хэлбэр
                </div>
              ),
            }}
          >
            <ResponsibilityType />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            stepProps={{
              description: (
                <div className="mt-2 text-base font-semibold ">
                  Холбоо барих хүний талаарх мэдээлэл
                </div>
              ),
            }}
          >
            <ContactPerson formRef={formRef} detail={getAC11A?.data} />
          </StepsForm.StepForm>
        </StepsForm>
      )}
    </div>
  );
};

export default AC11A;
