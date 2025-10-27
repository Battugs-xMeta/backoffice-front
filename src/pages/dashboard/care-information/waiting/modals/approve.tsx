import {
  ModalForm,
  ModalFormProps,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Avatar, Button, Col, Row, UploadFile, notification } from "antd";
import { SectionContainer, UploadButton } from "components/index";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Address from "service/address";
import careInformation from "service/care-information";
import { ElderlyList } from "service/care-information/types";
import file from "service/file";
import workers from "service/workers";

type PropsApprove = ModalFormProps & {
  onCancel: () => void;
  data?: ElderlyList;
  onFinish?: () => void;
};

interface SelectOption {
  value: number;
  label: React.ReactNode;
}

export const ApproveModal = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsApprove) => {
  const city = useRequest(Address.city, {
    manual: true,
  });
  const district = useRequest(Address.district, {
    manual: true,
  });
  const khoroo = useRequest(Address.khoroo, {
    manual: true,
  });

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const formRef = useRef<ProFormInstance>();

  const approveRequest = useRequest(careInformation.approveRequest, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      }),
        onFinish && onFinish();
    },

    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        onFinish && onFinish();
    },
  });

  const getWorkers = useRequest(workers.getWorkers, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    getWorkers.run({ current: 1, pageSize: 20 });
    if (data && data?.social_worker_elderly?.city_id) {
      district.run(data?.social_worker_elderly?.city_id);
    }
  }, [data]);

  const debouncedSearch = debounce((value) => {
    getWorkers.run({
      current: 1,
      pageSize: 20,
      query: value,
    });
  }, 1000);

  return (
    <>
      {uploadMulti?.loading ||
        (approveRequest?.loading ? (
          <PageLoading />
        ) : (
          <ModalForm
            {...rest}
            modalProps={{ maskClosable: false, onCancel, className: "rounded" }}
            onOpenChange={() => formRef.current?.resetFields()}
            formRef={formRef}
            open={!!data}
            loading={uploadMulti?.loading || approveRequest?.loading}
            title={
              <div className="flex items-center justify-between ">
                <div className="text-base text-gray-800 font-semibold">
                  {"Үйлчлүүлэгчийг хүлээж авах"}
                </div>
              </div>
            }
            submitter={{
              render: ({ submit: approveRequest }) => {
                return (
                  <div className="flex items-center justify-between w-full px-5 border-t border-solid border-b-0 border-l-0 border-r-0 border-gray-300 pt-3">
                    <Button
                      size="large"
                      className="w-1/2 text-sm  items-center"
                      onClick={() => onCancel && onCancel()}
                    >
                      <FaArrowLeft
                        accentHeight={11.67}
                        color="#344054"
                        size={12}
                        className="mx-2"
                      />
                      Буцах
                    </Button>
                    <Button
                      size="large"
                      className="w-1/2 text-sm flex items-center justify-center"
                      type="primary"
                      onClick={approveRequest}
                    >
                      <IoMdCheckmark color="#fff" size={13} className="mx-2" />
                      Хүлээж авах
                    </Button>
                  </div>
                );
              },
            }}
            onFinish={async (values) => {
              if (!!data) {
                if (
                  values.three_way_contract &&
                  values.three_way_contract.length > 0
                ) {
                  values.three_way_contract = await uploadMulti
                    .runAsync({
                      names: values.jewelry_registry?.map(
                        (el: UploadFile) => el?.name
                      ),
                      files: values.jewelry_registry,
                    })
                    .then((el: any) => el.map((el: any) => el.id));
                }
                if (
                  values.jewelry_registry &&
                  values.jewelry_registry.length > 0
                ) {
                  values.jewelry_registry = await uploadMulti
                    .runAsync({
                      names: values.jewelry_registry?.map(
                        (el: UploadFile) => el?.name
                      ),
                      files: values.jewelry_registry,
                    })
                    .then((el: any) => el.map((el: any) => el.id));
                }
                if (
                  values.social_worker_situational &&
                  values.social_worker_situational.length > 0
                ) {
                  values.social_worker_situational = await uploadMulti
                    .runAsync({
                      names: values.social_worker_situational?.map(
                        (el: UploadFile) => el?.name
                      ),
                      files: values.social_worker_situational,
                    })
                    .then((el: any) => el.map((el: any) => el.id));
                }
                if (
                  await approveRequest.runAsync(data.id, {
                    ...values,
                    three_way_contract: values.three_way_contract,
                    jewelry_registry: values.jewelry_registry,
                    received_date: dayjs(values.received_date).toDate(),
                    social_worker_situational: values.social_worker_situational,
                    status: 6,
                  })
                ) {
                  return true;
                }
              }
              return false;
            }}
            // initialValues={{
            //   delivered_person.city_id:
            // }}
          >
            <div className="bg-white rounded my-3">
              <SectionContainer label="Хүлээж авсан">
                <ProFormSelect
                  name={"received_employees"}
                  label="Хүлээж авсан"
                  shouldUpdate
                  fieldProps={{
                    showSearch: true,
                    loading: getWorkers.loading,
                    filterOption: false,
                    onSearch: debouncedSearch,
                  }}
                  rules={FORM_ITEM_RULE()}
                  mode="multiple"
                  className="mupltiple-selecter"
                  placeholder="Сонгох"
                  options={getWorkers?.data?.items.reduce<SelectOption[]>(
                    (acc, record) => {
                      acc.push({
                        label: (
                          <div className="flex gap-2 items-center">
                            <Avatar
                              shape="circle"
                              size={"small"}
                              src={file.fileToUrl(
                                record.profile?.physical_path || "AS"
                              )}
                            />
                            <span>{`${record?.last_name?.substring(0, 1)}. ${
                              record?.first_name
                            }`}</span>
                          </div>
                        ),
                        value: record?.id,
                      });
                      return acc;
                    },
                    []
                  )}
                />
                <ProFormDatePicker
                  fieldProps={{
                    disabledDate: (current) => {
                      return current && current > moment().endOf("day");
                    },
                  }}
                  rules={FORM_ITEM_RULE()}
                  name={"received_date"}
                  label="Хүлээж авсан огноо"
                  placeholder={"Огноо сонгох"}
                />
                <Row gutter={[24, 24]}>
                  <Col span={12}>
                    <UploadButton
                      name={"three_way_contract"}
                      label="3 талт гэрээ"
                      required
                      accept=".pdf"
                      rules={[
                        {
                          required: true,
                          validator: (_, value) => {
                            if (
                              value &&
                              value?.[0]?.originFileObj?.type !==
                                "application/pdf"
                            ) {
                              return Promise.reject("Файл PDF файл байх ёстой");
                            }
                            return Promise.resolve(value);
                          },
                        },
                      ]}
                    />
                  </Col>
                  <Col span={12}>
                    <UploadButton
                      name={"jewelry_registry"}
                      label="Үйлчлүүлэгчийн үнэт эдлэлийн бүртгэл"
                      accept=".pdf"
                      required
                      rules={[
                        {
                          required: true,
                          validator: (_, value) => {
                            if (
                              value &&
                              value?.[0]?.originFileObj?.type !==
                                "application/pdf"
                            ) {
                              return Promise.reject("Файл PDF файл байх ёстой");
                            }
                            return Promise.resolve(value);
                          },
                        },
                      ]}
                    />
                  </Col>
                </Row>
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <UploadButton
                      name={"social_worker_situational"}
                      label="Нийгмийн ажилтны нөхцөл байдлын үнэлгээний хуудас"
                      accept=".pdf"
                      required
                      rules={[
                        {
                          required: true,
                          validator: (_, value) => {
                            if (
                              value &&
                              value?.[0]?.originFileObj?.type !==
                                "application/pdf"
                            ) {
                              return Promise.reject("Файл PDF файл байх ёстой");
                            }
                            return Promise.resolve(value);
                          },
                        },
                      ]}
                    />
                  </Col>
                </Row>

                <ProFormSwitch
                  className="mb-3"
                  label="Дотоод дүрэм журамтай танилцсан эсэх"
                  name="is_see_internal_regulations"
                  required
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Журамтай танилцсан байх ёстой")
                            ),
                    },
                  ]}
                />

                <ProFormText
                  name={"received_document_items"}
                  rules={FORM_ITEM_RULE()}
                  label="Биетээр хүлээлгэж өгсөн бичиг баримт"
                  placeholder="Сонгох"
                  // className="custom-antd-selecter"
                />
              </SectionContainer>
              <SectionContainer label="Хүлээлгэж өгсөн">
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <ProFormSelect
                      placeholder="Сонгох"
                      name={["delivered_person", "city_id"]}
                      initialValue={data?.social_worker_elderly?.city_id}
                      rules={FORM_ITEM_RULE()}
                      label="Аймаг / Нийслэл"
                      onChange={(val) => {
                        district.run(val);
                        formRef.current?.setFieldValue(
                          ["delivered_person", "district_id"],
                          undefined
                        );
                        formRef.current?.setFieldValue(
                          ["delivered_person", "khoroo_id"],
                          undefined
                        );
                      }}
                      request={async () => {
                        const data = await city.runAsync();
                        return data?.map((item: any) => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        });
                      }}
                    />
                  </Col>
                  <Col span={8} className="w-full">
                    <ProFormSelect
                      placeholder="Сонгох"
                      name={["delivered_person", "district_id"]}
                      rules={FORM_ITEM_RULE()}
                      initialValue={data?.social_worker_elderly?.district_id}
                      label="Сум / Дүүрэг"
                      onChange={(value) => {
                        formRef.current?.setFieldValue(
                          ["delivered_person", "khoroo_id"],
                          undefined
                        );
                        khoroo.run(value);
                      }}
                      options={district.data?.map((item: any) => {
                        return {
                          label: item?.name,
                          value: item?.id,
                        };
                      })}
                    />
                  </Col>
                  <Col span={8} className="w-full">
                    <ProFormSelect
                      placeholder="Сонгох"
                      name={["delivered_person", "khoroo_id"]}
                      // initialValue={data?.social_worker_elderly?.khoroo_id}
                      // rules={FORM_ITEM_RULE()}
                      label="Баг / Хороо"
                      options={khoroo?.data?.map((item: any) => {
                        return {
                          label: item?.name,
                          value: item?.id,
                        };
                      })}
                    />
                  </Col>
                </Row>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <ProFormText
                      name={["delivered_person", "first_name"]}
                      placeholder={"Нэр оруулна уу"}
                      label={"Нэр"}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={8} className="w-full">
                    <ProFormText
                      name={["delivered_person", "position"]}
                      placeholder={"Албан тушаал"}
                      label={"Албан тушаал"}
                      rules={FORM_ITEM_RULE()}
                    />
                  </Col>
                  <Col span={8} className="w-full">
                    <ProFormText
                      name={["delivered_person", "phone_number"]}
                      placeholder={"94112725"}
                      label={"Холбоо барих утасны дугаар"}
                      rules={[
                        {
                          pattern: /^[1-9]{1}[0-9]{7}$/g,
                          message: "Энэ талбар утасны дугаар байх ёстой",
                        },
                        ...FORM_ITEM_RULE(),
                      ]}
                    />
                  </Col>
                </Row>
              </SectionContainer>
            </div>
          </ModalForm>
        ))}
    </>
  );
};
