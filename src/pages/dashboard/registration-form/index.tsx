import { ArrowRightOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Card, Collapse, Tag, notification } from "antd";
import { CollapseProps } from "antd/lib";
import updateIcon from "assets/icons/updateIcon.svg";
import { IfCondition } from "components/condition";
import { Process } from "components/process";
import { RegisterFormStatus, RegisterFormStatusEnum } from "config";
import React, { useEffect } from "react";
import register_form from "service/registration-form";
import { dateFormat } from "utils/index";
import { getRegisterColor } from "utils/utils_func";
import AC11A from "./new-and-returned/AC11A";
import AC11B from "./new-and-returned/AC11B";
import AC12 from "./new-and-returned/AC12";
import SentAC11A from "./sent-and-approved/AC11A";
import SentAC11B from "./sent-and-approved/AC11B";
import SentAC12 from "./sent-and-approved/AC12";

const RegistrationForm: React.FC = () => {
  const [current, setCurrent] = React.useState(["1"]);
  const [onSendRequest, setOnSendRequest] = React.useState(false);
  const [render, setRender] = React.useState(false);
  const [changeForm, setChangeForm] = React.useState("");
  const [processAC11A, setProcessAC11A] = React.useState(0);
  const [processAC11B, setProcessAC11B] = React.useState(0);
  const [processAC12, setProcessAC12] = React.useState(0);
  const status = useRequest(register_form.getStatus, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    status.run();
  };

  console.log(current, "current");
  const newAndReturnedItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="text-lg font-semibold text-gray-7000 ml-4 gap-2 items-center ">
          <span className="flex items-center">
            Б-АС-1.1А - Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж,
            байгууллагын мэдээ
          </span>
          {current.includes("1") && <Process process={processAC11A} />}
        </div>
      ),
      children: (
        <AC11A setCurrentAdd={setCurrent} setProcess={setProcessAC11A} />
      ),
    },
    {
      key: "2",
      label: (
        <div className="text-lg font-semibold text-gray-7000 ml-4 gap-2 items-center ">
          <div className="flex items-center">
            Б-АС-1.1Б - Барилга байгууламжийн мэдээлэл
          </div>
          {current.includes("2") && <Process process={processAC11B} />}
        </div>
      ),
      children: (
        <AC11B setCurrentAdd={setCurrent} setProcess={setProcessAC11B} />
      ),
    },
    {
      key: "3",
      label: (
        <div className="text-lg font-semibold text-gray-7000 ml-4 gap-2 items-center ">
          <div className="flex items-center">
            Б-АС-1.2 - Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж,
            байгууллагын орлого, зарлага, хөрөнгийн мэдээ
          </div>
          {current.includes("3") && <Process process={processAC12} />}
        </div>
      ),
      children: (
        <AC12 setOnSendRequest={setOnSendRequest} setProcess={setProcessAC12} />
      ),
    },
  ];

  const sentAndApprovedItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="text-lg font-semibold text-gray-7000 ml-4">
          Б-АС-1.1А - Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж,
          байгууллагын мэдээ
        </div>
      ),
      children: <SentAC11A />,
    },
    {
      key: "2",
      label: (
        <div className="text-lg font-semibold text-gray-7000 ml-4">
          Б-АС-1.1Б - Барилга байгууламжийн мэдээлэл
        </div>
      ),
      children: <SentAC11B />,
    },
    {
      key: "3",
      label: (
        <div className="text-lg font-semibold text-gray-7000 ml-4">
          Б-АС-1.2 - Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж,
          байгууллагын орлого, зарлага, хөрөнгийн мэдээ
        </div>
      ),
      children: <SentAC12 />,
    },
  ];

  const sendRequest = useRequest(register_form.sendRequest, {
    manual: true,
    onSuccess() {
      notification.success({
        message:
          "Таны мэдээллийг хүлээн авлаа. Баталгаажуулалт хийгдсэний дараа идэвхтэй болно.",
      });
    },
    onError(err) {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    run();
  }, [
    onSendRequest,
    render,
    status?.data?.status === RegisterFormStatusEnum.sent,
  ]);

  return (
    <div>
      <Card
        className={`mb-3 mt-4 ${
          status?.data?.status === RegisterFormStatusEnum.rejected
            ? "bg-red-50 border-red-300"
            : ""
        }`}
        loading={sendRequest.loading}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="m-0 p-0 text-base font-semibold ">
              Төлөв:
              <Tag
                color={getRegisterColor(status?.data?.status as number)}
                className="ml-2"
                bordered={false}
              >
                <span className="text-sm text-[#black] font-normal">
                  {
                    (RegisterFormStatus as { [key: string]: string })[
                      status?.data?.status as number
                    ]
                  }
                </span>
              </Tag>
            </p>
            <p className="m-0 p-0">
              {(status?.data?.status === RegisterFormStatusEnum.saved ||
                status?.data?.status === RegisterFormStatusEnum.saved0) && (
                <span>Шинэчилсэн огноо:</span>
              )}
              {status?.data?.status === RegisterFormStatusEnum.approved && (
                <span>Батлагдсан огноо:</span>
              )}
              {status?.data?.status === RegisterFormStatusEnum.sent && (
                <span>Илгээсэн огноо:</span>
              )}
              {status?.data?.status === RegisterFormStatusEnum.rejected && (
                <span className="text-gray-600">
                  {status.data?.return_description}
                </span>
              )}
              {status?.data?.status === RegisterFormStatusEnum.rejected ? (
                ""
              ) : (
                <span className="font-semibold text-sm mr-2">
                  {dateFormat(status?.data?.updated_at)}
                </span>
              )}
            </p>
          </div>

          {(status?.data?.status === RegisterFormStatusEnum.saved ||
            status?.data?.status === RegisterFormStatusEnum.saved0 ||
            changeForm === "new") && (
            <Button
              size="large"
              type="primary"
              className={`flex items-center gap-2 ${
                status.data?.status === RegisterFormStatusEnum.sent
                  ? "hidden"
                  : ""
              }`}
              disabled={!onSendRequest}
              onClick={() => {
                setRender(!render);
                sendRequest.run();
                setChangeForm("");
              }}
            >
              Илгээх
              <ArrowRightOutlined rev={undefined} />
            </Button>
          )}

          {/* {status?.data?.status === RegisterFormStatusEnum.sent && (
            <Button
              size="large"
              type="primary"
              className="flex items-center gap-2"
              onClick={sendRequest.run}
            >
              <CloudDownloadOutlined rev={undefined} size={20} />
              Татах
            </Button>
          )} */}

          {(status?.data?.status === RegisterFormStatusEnum.rejected ||
            status?.data?.status === RegisterFormStatusEnum.approved) && (
            <Button
              size="large"
              type="primary"
              className={`flex items-center gap-2 ${
                changeForm === "new" ? "hidden" : ""
              }`}
              onClick={() => {
                setChangeForm("new");
              }}
            >
              <img src={updateIcon} alt="update" />
              Шинэчлэх
            </Button>
          )}
        </div>
      </Card>

      <IfCondition
        condition={
          status?.data?.status === RegisterFormStatusEnum.saved ||
          status?.data?.status === RegisterFormStatusEnum.saved0 ||
          changeForm === "new"
        } // 0 is new
        whenTrue={
          <Collapse
            items={newAndReturnedItems}
            activeKey={current}
            onChange={(key) => {
              setCurrent(key as any);
            }}
            expandIconPosition="end"
            style={{ background: "red !important" }}
          />
        }
      />

      {changeForm === "" && (
        <IfCondition
          condition={
            status?.data?.status === RegisterFormStatusEnum.sent ||
            status?.data?.status === RegisterFormStatusEnum.approved ||
            status?.data?.status === RegisterFormStatusEnum.rejected
          } // Илгээсэн болон батлагдсан эсвэл татгазсан төлөвтэй байхад
          whenTrue={
            <Collapse
              items={sentAndApprovedItems}
              activeKey={current}
              onChange={(key) => {
                setCurrent(key as any);
              }}
              expandIconPosition="end"
              style={{ background: "red !important" }}
            />
          }
        />
      )}
    </div>
  );
};

export default RegistrationForm;
