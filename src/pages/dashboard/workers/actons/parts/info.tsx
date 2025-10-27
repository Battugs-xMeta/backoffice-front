import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import type { UploadFile } from "antd";
import { Col, Modal, Row, notification } from "antd";
import { SectionContainer } from "components/index";
import { SectionInlineField } from "components/modal/section";
import { FORM_ITEM_RULE, getBase64, workersGenderArray } from "config";
import moment from "moment";
import { useEffect, useState } from "react";
import roleManagement from "service/role-management";
import { moneyFormat } from "utils/index";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface SelectOption {
  value: number;
  label: React.ReactNode;
}

export const uploadButton = (
  <button style={{ border: 0, background: "none" }} type="button">
    <PlusOutlined rev={undefined} />
    <div style={{ marginTop: 8 }}>Зураг оруулах</div>
  </button>
);

export const Info = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handleCancel = () => setPreviewOpen(false);

  const allRoles = useRequest(roleManagement.listAll, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    allRoles.run({});
  }, []);

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

  return (
    <SectionContainer>
      <div id={"profile_id"}>
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
          name="profile_id"
          label="Цээж зураг (3x4 хэмжээтэй)"
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
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <ProFormText
            name={"family_name"}
            placeholder={"Ургийн овог"}
            label={"Ургийн овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name={"last_name"}
            placeholder={"Овог"}
            label={"Овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name={"first_name"}
            placeholder={"Нэр"}
            label="Нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <ProFormText
            name={"rd"}
            placeholder={"Регистр"}
            label="Регистрийн дугаар"
            rules={[
              {
                pattern: /^[а-яА-Я]{2}[0-9]{1}[0-9]{7}$/,
                message: "Энэ талбар РД байх ёстой",
              },
              ...FORM_ITEM_RULE(),
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker
            fieldProps={{
              disabledDate: (current) => {
                return current && current > moment().endOf("day");
              },
            }}
            name={"birth_date"}
            rules={FORM_ITEM_RULE()}
            placeholder={"Огноо сонгох"}
            label={"Төрсөн огноо"}
            width="lg"
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name={"gender"}
            options={workersGenderArray.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
            label="Хүйс"
            placeholder={"Хүйс сонгох"}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={8}>
          <ProFormText
            name={"email"}
            placeholder={"sample@example.cг"}
            label="Цахим шуудан"
            rules={[
              {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Энэ талбар и-мэйл хаяг байх ёстой",
              },
              ...FORM_ITEM_RULE(),
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name={"phone"}
            placeholder={"Утас"}
            fieldProps={{
              addonBefore: "+976",
            }}
            rules={[
              {
                pattern: /^[1-9]{1}[0-9]{7}$/g,
                message: "Энэ талбар утасны дугаар байх ёстой",
              },
              ...FORM_ITEM_RULE(),
            ]}
            label="Утас"
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name={"role_id"}
            rules={FORM_ITEM_RULE()}
            label="Үүрэг"
            placeholder={"Сонгоно уу"}
            fieldProps={{
              showSearch: true,
              loading: allRoles.loading,
              filterOption: false,
            }}
            options={allRoles?.data?.reduce<SelectOption[]>((acc, record) => {
              acc.push({
                label: (
                  <div className="flex gap-2 items-center">{record?.name}</div>
                ),
                value: record?.id,
              });
              return acc;
            }, [])}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={8} className=" items-center">
          <SectionInlineField
            label="Хөгжлийн бэрхшээлтэй эсэх"
            children={
              <ProFormSwitch name="is_disability" className="mb-2 pb-1" />
            }
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 15 }}>
        <Col span={6}>
          <ProFormText
            rules={FORM_ITEM_RULE()}
            name={"position"}
            placeholder={"Албан тушаал"}
            label="Албан тушаал"
          />
        </Col>
        {/* <Col span={6}>
          <ProFormSelect
            name={"category"}
            options={PRODUCT_CATEGORY_ARRAY.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
            label="Ажилтны төрөл"
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            name={"category"}
            options={PRODUCT_CATEGORY_ARRAY.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
            label="Ангилал"
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            name={"category"}
            options={PRODUCT_CATEGORY_ARRAY.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
            label="Орон тоо"
          />
        </Col> */}
      </Row>
      <Row gutter={[24, 24]}>
        {/* <Col span={8}>
          <ProFormDatePicker      fieldProps={{
              disabledDate : (current) => {
                return current && current > moment().endOf('day');
              }
            }}  
            name={"birth_date"}
            rules={FORM_ITEM_RULE()}
            placeholder={"Ажилд орсон огноо"}
            label={"Ажилд орсон огноо"}
            width="lg"
          />
        </Col> */}
        <Col span={8}>
          <ProFormDigit
            name={"total_worked_year"}
            placeholder={"Жишээ нь: 3 Сар"}
            label={"Нийт ажилласан жил"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name={"worker_year"}
            placeholder={"Жишээ нь: 3 Сар"}
            label="Ажилласан жил"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <div className="text-lg font-medium">Цалин хөлсний мэдээлэл</div>
      <div className="h-px bg-[#EAECF0] my-2"></div>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <ProFormDigit
            name={"salary"}
            rules={FORM_ITEM_RULE()}
            placeholder={"Цалин"}
            convertValue={(value) => moneyFormat(value)}
            fieldProps={{
              addonAfter: "₮",
            }}
            label="Үндсэн цалин"
          />
        </Col>
        {/* <Col span={5}>
          <SectionInlineField
            label="Нэмэгдэл цалин"
            children={
              <Switch
                checked={addMoney}
                onChange={setAddingMoney}
                className="mb-2 pb-1"
              />
            }
          />
          {addMoney && (
            <ProFormText
              label=""
              name={"lastname"}
              placeholder={"Үнэ"}
              fieldProps={{
                addonAfter: "₮",
              }}
              readonly={!addMoney}
            />
          )}
        </Col> */}
        {/* <Col span={5}>
          <SectionInlineField
            label="Нэмэгдэл"
            children={
              <Switch
                checked={addPercent}
                onChange={setAddPercent}
                className="mb-2 pb-1"
              />
            }
          />
          {addPercent && (
            <ProFormDigit
              label=""
              name={"lastname"}
              placeholder={"Үнэ"}
              fieldProps={{
                addonAfter: "%",
              }}
              readonly={!addPercent}
            />
          )}
        </Col>
        <Col span={8}>
          <ProFormDigit
            name={"salary"}
            rules={FORM_ITEM_RULE()}
            placeholder={"Нийгмийн даатгалын шимтгэл"}
            fieldProps={{
              addonAfter: "₮",
            }}
            label="Нийгмийн даатгалын шимтгэл"
          />
        </Col> */}
      </Row>
      {/* <Row gutter={[24, 24]}>
        <Col span={6}>
          <ProFormText
            name={"all"}
            placeholder={"Дүнг оруул"}
            fieldProps={{
              addonAfter: "₮",
            }}
            label="Бүгд"
          />
        </Col>
      </Row> */}
    </SectionContainer>
  );
};
