import { UserOutlined } from "@ant-design/icons";
import ProForm, {
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Col, Row, notification } from "antd";
import { SectionContainer, UploadButton } from "components/index";
import { FORM_ITEM_RULE, TransictionsStatusArray } from "config";
import { useAuthContext } from "context/auth";
import dayjs from "dayjs";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import Address from "service/address";
import careInformation from "service/care-information";
import charityOrganization from "service/charity-organization";
import file from "service/file";
import { MovementStatusEnum } from "service/transictions/types";
import workers from "service/workers";

interface SelectOption {
  value: number;
  label: React.ReactNode;
}

type InfoProps = {
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined>;
};

export const Info: React.FC<InfoProps> = ({ formRef }) => {
  const [user] = useAuthContext();
  const city = useRequest(Address.city, {
    manual: true,
  });

  const district = useRequest(Address.district, {
    manual: true,
  });

  const khoroo = useRequest(Address.khoroo, {
    manual: true,
  });

  const [choisenCareCenter, setChoisenCareCenter] = useState<number>(0);
  const [elderlyId, setElderlyId] = useState<number>(0);

  const allCareCenters = useRequest(Address.AllCareCenters, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const allElderliesNotes = useRequest(Address.AllElderlyNotes, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const choisonCentersEmployes = useRequest(workers.choisenCareCentersWorkers, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const elderies = useRequest(careInformation.getElderlyList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const getWorkers = useRequest(workers.getWorkers, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const charityOrgList = useRequest(charityOrganization.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    elderies.run({ current: 1, pageSize: 20, status: 6 }); // Идвэхтэй үйлчлүүлэгчийн жагсаалтийг авахдаа status ийг 6 болгож дуудна
    getWorkers.run({ current: 1, pageSize: 20 });
    charityOrgList.run({ current: 1, pageSize: 20 });
    allCareCenters.run({});
  }, []);

  const debouncedSearchElderlies = debounce((value) => {
    elderies.run({
      current: 1,
      pageSize: 20,
      status: 6,
      query: value,
    });
  }, 1000);

  const debouncedSearchWorkers = debounce((value) => {
    getWorkers.run({
      current: 1,
      pageSize: 20,
      query: value,
    });
  }, 1000);

  const debouncedSearchAllCareCenter = debounce((value) => {
    allCareCenters.run({
      query: value,
    });
  }, 1000);

  const debouncedChoisenWorkers = debounce((value) => {
    choisonCentersEmployes.run({
      query: value,
      care_center_id: choisenCareCenter,
    });
  }, 1000);

  const debouncedAllElderlyNotes = debounce((value) => {
    allElderliesNotes.run({
      query: value,
      elderly_id: elderlyId,
    });
  }, 1000);

  const filteredCareCenter = allCareCenters?.data?.filter(
    (val) => val?.id !== user.user.care_center.id
  );

  return (
    <>
      <div>
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return (
              <>
                <ProFormSelect
                  name={"elderly_id"}
                  label="Үйлчлүүлэгч"
                  shouldUpdate
                  fieldProps={{
                    showSearch: true,
                    loading: elderies.loading,
                    filterOption: false,
                    onSearch: debouncedSearchElderlies,
                    onChange: (value) => {
                      allElderliesNotes.run({ elderly_id: value });
                      setElderlyId(value as number);
                    },
                  }}
                  required
                  rules={FORM_ITEM_RULE()}
                  placeholder="Сонгох"
                  options={elderies?.data?.items.reduce<SelectOption[]>(
                    (acc, record) => {
                      acc.push({
                        label: (
                          <div className="flex gap-2 items-center">
                            {record?.elderly?.profile ? (
                              <Avatar
                                shape="circle"
                                size={25}
                                src={file.fileToUrl(
                                  record?.elderly?.profile?.physical_path ||
                                    "AS"
                                )}
                              />
                            ) : (
                              <Avatar
                                shape="circle"
                                size={25}
                                icon={<UserOutlined rev={undefined} />}
                              />
                            )}
                            <span>{`${record?.elderly?.last_name?.substring(
                              0,
                              1
                            )}. ${record?.elderly?.first_name}`}</span>
                          </div>
                        ),
                        value: record.elderly?.id,
                      });
                      return acc;
                    },
                    []
                  )}
                />

                <ProFormSelect
                  name={"movement_type"}
                  shouldUpdate
                  options={TransictionsStatusArray.map((el) => ({ ...el }))}
                  rules={FORM_ITEM_RULE()}
                  label="Шийдвэрийн төрөл"
                  initialValue={TransictionsStatusArray[0].value}
                />

                {form.getFieldValue("movement_type") ===
                  MovementStatusEnum.moving && (
                  // move_type 11 бол үйлчлүүлэгчийг бусад асрамжийн газар руу шилжүүлэх
                  <>
                    <ProFormSelect
                      name={"toCareCenterID"}
                      label="Асрамжийн газар"
                      shouldUpdate
                      rules={FORM_ITEM_RULE()}
                      fieldProps={{
                        showSearch: true,
                        loading: allCareCenters.loading,
                        filterOption: false,
                        onSearch: debouncedSearchAllCareCenter,
                        onChange: (value: number, optionLabelProp) => {
                          choisonCentersEmployes.run({
                            care_center_id: value,
                            query: "",
                          });
                          setChoisenCareCenter(value);
                        },
                      }}
                      required
                      placeholder="Сонгох"
                      options={filteredCareCenter?.reduce<SelectOption[]>(
                        (acc, record) => {
                          acc.push({
                            label: (
                              <div className="flex gap-2 items-center">
                                <Avatar
                                  size={"small"}
                                  src={file.fileToUrl(
                                    record.logo?.physical_path || "AS"
                                  )}
                                />
                                <span>{record.organization_name}</span>
                              </div>
                            ),
                            value: record.id,
                          });
                          return acc;
                        },
                        []
                      )}
                    />
                    <ProFormText
                      name={"unique_number"}
                      label="Дугаар"
                      rules={FORM_ITEM_RULE()}
                      placeholder="008"
                    />
                    <ProFormDatePicker
                      rules={FORM_ITEM_RULE()}
                      fieldProps={{
                        disabledDate: (current) => {
                          return current && current > moment().endOf("day");
                        },
                      }}
                      name={"out_date"}
                      label="Огноо"
                      placeholder={"Огноо сонгох"}
                    />
                    <UploadButton
                      required={false}
                      name={"protocols"}
                      label="Файл хавсаргах"
                    />
                    <ProFormTextArea
                      rules={FORM_ITEM_RULE()}
                      name={"description"}
                      label="Шилжих шалтгаан"
                      placeholder="Шилжих болсон шалтгаан"
                    />
                    <h1 className="text-[#1D2939] text-lg ">
                      Хүлээлгэж өгсөн
                      {/* <span className="text-gray-500 ">
                        (Батсүмбэр асрамжийн газар)
                      </span> */}
                    </h1>
                    <ProFormSelect
                      name={"delivered_employees"}
                      label="Албан тушаалтнууд"
                      shouldUpdate
                      rules={FORM_ITEM_RULE()}
                      mode="multiple"
                      className="mupltiple-selecter"
                      fieldProps={{
                        showSearch: true,
                        loading: getWorkers.loading,
                        filterOption: false,
                        onSearch: debouncedSearchWorkers,
                      }}
                      placeholder="Сонгох"
                      options={getWorkers?.data?.items.reduce<SelectOption[]>(
                        (acc, record) => {
                          acc.push({
                            label: (
                              <div className="flex gap-2 items-center">
                                {record?.profile ? (
                                  <Avatar
                                    shape="circle"
                                    size={25}
                                    src={file.fileToUrl(
                                      record?.profile?.physical_path || "AS"
                                    )}
                                  />
                                ) : (
                                  <Avatar
                                    shape="circle"
                                    size={25}
                                    icon={<UserOutlined rev={undefined} />}
                                  />
                                )}
                                <span>{`${record?.last_name?.substring(
                                  0,
                                  1
                                )}. ${record?.first_name} (${
                                  record?.position === "-"
                                    ? "Ажилчин"
                                    : record?.position
                                })`}</span>
                              </div>
                            ),
                            value: record?.id,
                          });
                          return acc;
                        },
                        []
                      )}
                    />
                    <h1 className="text-[#1D2939] text-lg ">
                      Хүлээж авсан
                      {/* <span className="text-gray-500 ">
                        {form.getFieldValue("toCareCenterID")}
                      </span> */}
                    </h1>
                    <ProFormSelect
                      required
                      name={"received_employees"}
                      label="Албан тушаалтнууд"
                      shouldUpdate
                      mode="multiple"
                      className="mupltiple-selecter"
                      // rules={FORM_ITEM_RULE()}
                      fieldProps={{
                        showSearch: true,
                        loading: choisonCentersEmployes.loading ? true : false,
                        filterOption: false,
                        onSearch: debouncedChoisenWorkers,
                      }}
                      placeholder="Сонгох"
                      options={choisonCentersEmployes?.data?.reduce<
                        SelectOption[]
                      >((acc, record) => {
                        acc.push({
                          label: (
                            <div className="flex gap-2 items-center">
                              {record?.profile ? (
                                <Avatar
                                  shape="circle"
                                  size={25}
                                  src={file.fileToUrl(
                                    record?.profile?.physical_path || "AS"
                                  )}
                                />
                              ) : (
                                <Avatar
                                  shape="circle"
                                  size={25}
                                  icon={<UserOutlined rev={undefined} />}
                                />
                              )}
                              <span>{`${record?.last_name?.substring(0, 1)}. ${
                                record?.first_name
                              } (${
                                record?.position === "-"
                                  ? "Ажилчин"
                                  : record?.position
                              })`}</span>
                            </div>
                          ),
                          value: record.id,
                        });
                        return acc;
                      }, [])}
                    />
                  </>
                )}

                {form.getFieldValue("movement_type") ===
                  MovementStatusEnum.ownRequest && (
                  // move_type 12 бол үйлчлүүлэгч өөрийн хүсэлтээр гарсан гэсэн үг юм
                  <>
                    <ProFormText
                      name={"unique_number"}
                      label="Дугаар"
                      placeholder="008"
                      rules={FORM_ITEM_RULE()}
                    />
                    <ProFormTextArea
                      name={"description"}
                      label="Шалтгаан"
                      placeholder="Гарах болсон шалтгаан"
                      rules={FORM_ITEM_RULE()}
                    />
                    <ProFormDatePicker
                      fieldProps={{
                        disabledDate: (current) => {
                          return current && current > moment().endOf("day");
                        },
                      }}
                      name={"out_date"}
                      label="Огноо"
                      placeholder={"Огноо сонгох"}
                      rules={FORM_ITEM_RULE()}
                    />
                    <UploadButton
                      required={false}
                      name={"protocols"}
                      label="Файл хавсаргах"
                    />
                    <h1 className="text-[#1D2939] text-lg ">Хүлээж авсан</h1>
                    <Row gutter={[24, 24]}>
                      <Col span={8}>
                        <ProFormText
                          name={["received_person", "first_name"]}
                          label="Нэр"
                          placeholder="Нэр оруулна уу"
                          rules={FORM_ITEM_RULE()}
                        />
                      </Col>
                      <Col span={8}>
                        <ProFormText
                          name={["received_person", "who"]}
                          label="Хэн болох"
                          placeholder="Хүүхэд"
                          rules={FORM_ITEM_RULE()}
                        />
                      </Col>
                      <Col span={8}>
                        <ProFormText
                          name={["received_person", "phone_number"]}
                          label="Холбоо барих утасны дугаар"
                          placeholder="94112725"
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
                    <h1 className="text-[#1D2939] text-lg ">Хүлээлгэж өгсөн</h1>
                    <ProFormSelect
                      name={"delivered_employees"}
                      label="Албан тушаалтнууд"
                      shouldUpdate
                      mode="multiple"
                      rules={FORM_ITEM_RULE()}
                      className="mupltiple-selecter"
                      fieldProps={{
                        showSearch: true,
                        loading: getWorkers.loading,
                        filterOption: false,
                        onSearch: debouncedSearchWorkers,
                      }}
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
                                <span>{`${record?.last_name?.substring(
                                  0,
                                  1
                                )}. ${record?.first_name} (${
                                  record?.position === "-"
                                    ? "Ажилчин"
                                    : record?.position
                                })`}</span>
                              </div>
                            ),
                            value: record?.id,
                          });
                          return acc;
                        },
                        []
                      )}
                    />
                  </>
                )}

                {form.getFieldValue("movement_type") ===
                  MovementStatusEnum.force && (
                  // move_type 13 бол албадан гаргасан байдаг аа
                  <>
                    <ProFormText
                      name={"unique_number"}
                      label="Дугаар"
                      placeholder="008"
                      rules={FORM_ITEM_RULE()}
                    />
                    <ProFormTextArea
                      name={"description"}
                      label="Шалтгаан"
                      placeholder="Гарах болсон шалтгаан"
                      rules={FORM_ITEM_RULE()}
                    />
                    <ProFormSelect
                      name={"note_ids"}
                      label="Тэмдэглэл"
                      mode="multiple"
                      className="mupltiple-selecter"
                      shouldUpdate
                      fieldProps={{
                        showSearch: true,
                        loading: allElderliesNotes.loading,
                        filterOption: false,
                        onSearch: debouncedAllElderlyNotes,
                      }}
                      placeholder="Сонгох"
                      options={allElderliesNotes?.data?.reduce<SelectOption[]>(
                        (acc, record) => {
                          acc.push({
                            label: (
                              <div className="flex gap-2 items-center">
                                <span>{`${record?.name}. ${dayjs(
                                  record?.updated_at
                                ).format("YYYY/MM/DD HH:mm")}`}</span>
                              </div>
                            ),
                            value: record.id,
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
                      name={"out_date"}
                      label="Огноо"
                      placeholder={"Огноо сонгох"}
                      rules={FORM_ITEM_RULE()}
                    />
                    <UploadButton
                      required={false}
                      name={"protocols"}
                      label="Файл хавсаргах"
                    />
                    <SectionContainer label="Хүлээж авсан">
                      <Row gutter={[24, 24]}>
                        <Col span={8}>
                          <ProFormSelect
                            name={["received_place", "city_id"]}
                            label="Аймаг / Нийслэл"
                            rules={FORM_ITEM_RULE()}
                            onChange={(val) => {
                              district.run(val);
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
                            name={["received_place", "district_id"]}
                            rules={FORM_ITEM_RULE()}
                            label="Сум / Дүүрэг"
                            onChange={(value) => {
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
                            name={["received_place", "khoroo_id"]}
                            // rules={FORM_ITEM_RULE()}
                            label="Баг / Хороо"
                            placeholder="Баг / Хороо"
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
                            name={["received_place", "first_name"]}
                            placeholder={"Нэр оруулна уу"}
                            label={"Нэр"}
                            rules={FORM_ITEM_RULE()}
                          />
                        </Col>
                        <Col span={8} className="w-full">
                          <ProFormText
                            name={["received_place", "position"]}
                            placeholder={"Албан тушаал"}
                            label={"Албан тушаал"}
                            rules={FORM_ITEM_RULE()}
                          />
                        </Col>
                        <Col span={8} className="w-full">
                          <ProFormText
                            name={["received_place", "phone_number"]}
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
                    <h1 className="text-[#1D2939] text-lg ">Хүлээлгэж өгсөн</h1>
                    <ProFormSelect
                      name={"delivered_employees"}
                      label="Албан тушаалтнууд"
                      shouldUpdate
                      fieldProps={{
                        showSearch: true,
                        loading: getWorkers.loading,
                        filterOption: false,
                        onSearch: debouncedSearchWorkers,
                      }}
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
                                <span>{`${record?.last_name?.substring(
                                  0,
                                  1
                                )}. ${record?.first_name} (${
                                  record?.position === "-"
                                    ? "Ажилчин"
                                    : record?.position
                                })`}</span>
                              </div>
                            ),
                            value: record?.id,
                          });
                          return acc;
                        },
                        []
                      )}
                    />
                  </>
                )}

                {form.getFieldValue("movement_type") ===
                  MovementStatusEnum.died && (
                  // id 14 бол үйлчлүүлэгч нас барсан гэсэн үг юм
                  <>
                    <ProFormText
                      name={"unique_number"}
                      label="Дугаар"
                      placeholder="008"
                      rules={FORM_ITEM_RULE()}
                    />
                    <ProFormDateTimePicker
                      initialValue={dayjs().format("YYYY-MM-DD HH:mm:ss")}
                      name={"death_date"}
                      label="Нас барсан огноо"
                      placeholder={"Огноо сонгох"}
                      rules={FORM_ITEM_RULE()}
                    />
                    <UploadButton
                      name={"death_certificate"}
                      label="Нас барсны гэрчилгээ"
                      placeholder="Гарах болсон шалтгаан"
                    />
                    <UploadButton
                      name={"forensic_definition"}
                      label="Шүүх эмнэлгийн тодорхойлолт"
                      placeholder="Гарах болсон шалтгаан"
                    />
                    <h1 className="text-[#1D2939] text-lg ">Буяны ажил</h1>
                    <Row gutter={[24, 24]}>
                      <Col span={12}>
                        <ProFormSelect
                          name={["charity_work", "charity_work_id"]}
                          onChange={(value: number) => {
                            formRef?.current?.setFieldValue(
                              ["charity_work", "phone_number"],
                              charityOrgList?.data?.items?.find(
                                (val) => val.id === value
                              )?.phone_numbers
                            );
                          }}
                          label="Буяны ажил гүйцэтгэгч байгууллага"
                          rules={FORM_ITEM_RULE()}
                          options={charityOrgList?.data?.items?.map((val) => {
                            return {
                              label: val?.company_name,
                              value: val.id,
                            };
                          })}
                          placeholder="Байгууллагын нэр оуулна уу"
                        />
                      </Col>
                      <Col span={12}>
                        <ProFormSelect
                          name={["charity_work", "phone_number"]}
                          disabled
                          label="Холбоо барих утасны дугаар"
                          placeholder="99122121"
                          fieldProps={
                            {
                              // mode: "multiple",
                              // size: "small",
                            }
                          }
                        />
                      </Col>
                    </Row>
                    <ProFormTextArea
                      name={"description"}
                      label="Тайлбар"
                      placeholder="Тайлбар"
                      rules={FORM_ITEM_RULE()}
                    />
                    <ProFormTextArea
                      name={["charity_work", "burial_address"]}
                      label="Оршуулсан байршил"
                      placeholder="Оршуулсан газрын байршил"
                      rules={FORM_ITEM_RULE()}
                    />
                  </>
                )}
              </>
            );
          }}
        </ProForm.Item>
      </div>
    </>
  );
};
