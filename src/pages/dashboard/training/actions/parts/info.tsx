import {
  ProFormDatePicker,
  ProFormInstance,
  ProFormItem,
  ProFormSelect,
  ProFormSwitch,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionContainer, UploadDraggerButton } from "components/index";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import moment from "moment";
interface InfoProps {
  data: any[];
  formRef?: React.MutableRefObject<ProFormInstance | undefined>;
  loading: boolean;
  debouncedSearch: any;
}

export const Info = ({
  loading,
  debouncedSearch,
  data,
  formRef,
}: InfoProps) => {
  return (
    <>
      <ProFormSelect
        label="Ажилтан"
        name={"employee_id"}
        fieldProps={{
          // showSearch: true,
          loading: loading,
          // filterOption: false,
          onSearch: debouncedSearch,
        }}
        options={data?.map((el: any) => ({ ...el }))}
        rules={FORM_ITEM_RULE()}
        placeholder={"Сонгоно уу."}
        showSearch
      />
      <div className="h-px bg-[#EAECF0] mb-2"></div>
      <>
        <ProFormTextArea
          label={"Сургалтын нэр"}
          name="name"
          placeholder="Сургалтын нэр"
        />
      </>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDatePicker
            fieldProps={{
              disabledDate: (current) => {
                return current && current > dayjs().endOf("day");
              },
            }}
            name={"start_date"}
            rules={FORM_ITEM_RULE()}
            placeholder={"Огноо сонгох"}
            label={"Сургалт эхэлсэн огноо"}
            width={300}
          />
        </Col>
        <Col span={12}>
          <ProFormDatePicker
            fieldProps={{
              disabledDate: (current) => {
                return formRef?.current?.getFieldValue("start_date") > current;
              },
            }}
            label="Сургалт дууссан огноо"
            name={"end_date"}
            rules={FORM_ITEM_RULE()}
            placeholder={"Огноо сонгох"}
            width={300}
          />
        </Col>
      </Row>
      <ProFormSwitch
        name="is_certificate"
        label="Сертификат"
        style={{
          display: "flex",
        }}
      />
      <ProFormItem
        shouldUpdate={(a, b) => a.is_certificate !== b.is_certificate}
      >
        {(form) => {
          const value = form.getFieldValue("is_certificate");
          return (
            value && (
              <SectionContainer
                children={
                  <UploadDraggerButton
                    max={1}
                    label={"Сертификат хавсаргах"}
                    name={"certificate_id"}
                    required={false}
                  />
                }
              />
            )
          );
        }}
      </ProFormItem>
    </>
  );
};
