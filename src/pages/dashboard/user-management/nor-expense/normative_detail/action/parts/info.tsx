import ProForm, {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Col, Row, Timeline } from "antd";
import { UploadButton } from "components/index";
import { FORM_ITEM_RULE } from "config";
import { useState } from "react";
import { NormativeTypeArrayOptions } from "service/finance/type";
import { moneyFormat } from "utils/index";

export const Info = ({ amountProps, disabledOne }: any) => {
  const [amount, setAmount] = useState(amountProps || 0);

  return (
    <>
      <div className="custom-ant-card-padding-remove py-3 pl-6 bg-[#FFFCF5] rounded-lg flex items-center justify-start border-solid border border-yellow-500 mb-4">
        <span className="text-sm font-semibold text-center flex items-center justify-center text-[#B54708]">
          20 саяаас дээш үнийн дүнтэй зарлагад заавал дээрх баримтуудыг
          хавсаргана уу.
        </span>
      </div>
      {/* <ProFormDatePicker
        fieldProps={{
          disabledDate: (current) => {
            // Get the last day of the last month
            const lastDayOfLastMonth = moment()
              .subtract(1, "month")
              .endOf("month");

            // Disable months that are before the current month or after the last month
            return (
              current &&
              (current.isBefore(moment().startOf("month")) ||
                current.isAfter(lastDayOfLastMonth))
            );
          },
        }}
        name={"date"}
        rules={FORM_ITEM_RULE()}
        placeholder={"Огноо сонгох"}
        label={"Огноо"}
      /> */}
      <ProFormSelect
        name={"normative_type_id"}
        label="Норматив зардлын төрөл"
        shouldUpdate
        fieldProps={{
          showSearch: true,
          filterOption: false,
        }}
        disabled={disabledOne}
        required
        placeholder="Сонгох"
        options={NormativeTypeArrayOptions.map((el) => ({ ...el }))}
        initialValue={NormativeTypeArrayOptions[0].value}
      />
      <ProFormDigit
        name={"amount"}
        fieldProps={{
          addonAfter: "₮",
          onChange: (e: any) => {
            setAmount(e);
          },
        }}
        placeholder={"21’000’000"}
        label={"Зарцуулалт"}
        rules={FORM_ITEM_RULE()}
        convertValue={(value) => moneyFormat(value)}
      />
      <ProFormTextArea
        name={"description"}
        placeholder={"Тайлбар"}
        label={"Тайлбар"}
        rules={FORM_ITEM_RULE()}
      />
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            form.getFieldValue("amount") > 20_000_000 && (
              <>
                <Timeline
                  className="timeline"
                  items={[
                    {
                      children: (
                        <UploadButton
                          required
                          name={"order_files"}
                          label="Тушаал"
                          extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                        />
                      ),
                    },
                    {
                      children: (
                        <UploadButton
                          required
                          name={"meeting_note_files"}
                          label="Хурлын тэмдэглэл"
                          extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                        />
                      ),
                    },
                    {
                      children: (
                        <UploadButton
                          required
                          name={"advice_files"}
                          label="Зөвлөмж"
                          extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                        />
                      ),
                    },
                    {
                      children: (
                        <UploadButton
                          required
                          name={"contract_files"}
                          label="Гэрээ"
                          extra="PNG, JPG, PDF (хэмжээ: 800x400px)"
                        />
                      ),
                    },
                  ]}
                />

                <ProFormText
                  name={"tender_gov_mn"}
                  placeholder={"Tender.gov.mn URL"}
                  label={"Tender.gov.mn URL"}
                  required
                  // rules={FORM_ITEM_RULE()}
                />
              </>
            )
          );
        }}
      </ProForm.Item>
    </>
  );
};
