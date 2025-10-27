import {
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { Card, Col, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { UploadFile } from "antd/lib";
import { SectionContainer } from "components/index";
import LeafletMap from "components/map";
import { FORM_ITEM_RULE, getBase64 } from "config";
import Address from "service/address";
import { GETAC11A } from "service/registration-form/types";

const AddressOfEnterprise = ({
  formRef,
  detail,
}: {
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  detail: any;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);

  const city = useRequest(Address.city, {
    manual: true,
  });
  const district = useRequest(Address.district, {
    manual: true,
  });
  const khoroo = useRequest(Address.khoroo, {
    manual: true,
  });

  const [location, setLocation] = useState<[number, number]>(
    formRef.current?.getFieldValue("location") || [0, 0]
  );

  useEffect(() => {
    if (detail?.latitude) {
      setLocation([detail?.latitude, detail?.longitude]);
    }
  }, [detail]);

  const cityId = formRef.current?.getFieldValue("city_id");

  useEffect(() => {
    if (cityId) {
      district.run(cityId);
      khoroo.run(formRef.current?.getFieldValue("district_id"));
    }
  }, [cityId]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined rev={undefined} />
      <div style={{ marginTop: 8 }}>Зураг оруулах</div>
    </button>
  );

  return (
    <div className="h-full">
      <Card title={"Аж ахуйн нэгж, байгууллагын хаяг"} className="bg-[#F5F8F8]">
        <div>
          <ProFormUploadButton
            max={1}
            fieldProps={{
              beforeUpload: (file) => false,
              listType: "picture-card",
              multiple: true,
              onPreview: handlePreview,
            }}
            className="flex"
            icon={
              <UploadOutlined rev={undefined} className="flex justify-center" />
            }
            title="Файл оруулах"
            name="logo_id"
            label="Байгууллагын лого (3x4 хэмжээтэй)"
            rules={[
              {
                validator: (_, file) => {
                  if (file && file.length > 0) {
                    if (
                      file[0].type === "image/jpeg" ||
                      file[0].type === "image/png" ||
                      file[0].type === "png" ||
                      file[0].type === "jpg"
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Зөвхөн JPG, PNG файлыг оруулах боломжтой"
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              },
              ...FORM_ITEM_RULE(),
            ]}
          >
            {uploadButton}
          </ProFormUploadButton>
        </div>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full col-span-1">
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <ProFormText
                  name="company_rd"
                  placeholder={"1234567"}
                  label={"Регистрийн дугаар"}
                  fieldProps={{
                    addonAfter: "Байгууллагын нэр",
                  }}
                  rules={[
                    {
                      pattern: /(?<!\d)\d{7}(?!\d)/,
                      message: "Байгууллагын регистрийн дугаараа оруулна уу.",
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <ProFormSelect
                  name={"city_id"}
                  rules={FORM_ITEM_RULE()}
                  label="Аймаг / Нийслэл"
                  placeholder={"Аймаг / Нийслэл"}
                  onChange={(val) => {
                    district.run(val);
                    formRef.current?.setFieldsValue({
                      district_id: undefined,
                      khoroo_id: undefined,
                    });
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
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={24} className="w-full">
                <ProFormSelect
                  name={"district_id"}
                  rules={FORM_ITEM_RULE()}
                  label="Сум / Дүүрэг"
                  onChange={(value) => {
                    khoroo.run(value);
                  }}
                  placeholder={"Сум / Дүүрэг"}
                  options={district.data?.map((item: any) => {
                    return {
                      label: item?.name,
                      value: item?.id,
                    };
                  })}
                />
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={24} className="w-full">
                <ProFormSelect
                  name={"khoroo_id"}
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
          </div>
          <div className="col-span-1 mt-3">
            <SectionContainer>
              <div
                style={{
                  height: "300px",
                  width: "100%",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <LeafletMap
                  position={{ val: location, set: setLocation }}
                  onPositionChange={(lat: number, long: number) => {
                    formRef.current?.setFieldValue("location", [lat, long]);
                  }}
                />
              </div>
              <ProFormText hidden name="location" />
            </SectionContainer>
          </div>
        </div>
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormText
              name={"street"}
              label="Гудамж / Хороолол"
              placeholder="Гудамж / Хороолол"
            />
          </Col>
          <Col span={12} className="w-full">
            <ProFormText
              name={"building"}
              label="Байшин / Байр"
              placeholder="Байшин / Байр"
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormText
              name={"door_number"}
              label="Хашаа / Хаалганы  дугаар"
              placeholder="Хашаа / Хаалганы  дугаар"
            />
          </Col>
          <Col span={12} className="w-full">
            <ProFormText
              name={"phone_number"}
              placeholder={"Утас"}
              label={"Утас"}
              fieldProps={{
                addonBefore: "+976",
              }}
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх шаардлагатай",
                },
                {
                  pattern: /^[1-9]{1}[0-9]{7}$/g,
                  message: "Энэ талбар утасны дугаар байх ёстой",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormText
              name={"email"}
              placeholder={"Цахим шуудан"}
              label={"Цахим шуудан"}
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх шаардлагатай",
                },
                {
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Энэ талбар и-мэйл хаяг байх ёстой",
                },
              ]}
            />
          </Col>
          <Col span={12} className="w-full">
            <ProFormText
              name={"website"}
              label="Цахим хуудас"
              placeholder="www.example.com"
              fieldProps={{
                addonBefore: "https://",
              }}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12} className="w-full">
            <ProFormText
              name={"facebook"}
              placeholder={"https://www.facebook.com/test"}
              label={"Facebook холбоос"}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AddressOfEnterprise;
