import { Avatar, Col, Row } from "antd";
import CareGiverBadge from "components/badge/caregiver";
import dayjs from "dayjs";
import moment from "moment";
import { FC } from "react";
import file from "service/file";
import FilesImage from "assets/icons/files.svg";
import { Link } from "react-router-dom";
import MigrationCustomCard from "components/custom-card/migration";

interface Props {
  data: any;
}

const UserForce: FC<Props> = ({ data }) => {
  return (
    <>
      <div className="flex-col flex items-start">
        <div className="flex justify-between ">
          <div className="font-medium text-sm ">
            <CareGiverBadge status={data?.status_code} />
          </div>
        </div>
        <div>{dayjs(data.updated_at).format("YYYY-MM-DD HH:mm:ss")}</div>
        <div className="flex gap-2 items-center my-2 ">
          <Avatar
            shape="circle"
            size={30}
            src={file.fileToUrl(
              data?.modified_employee?.profile?.physical_path || "AS"
            )}
            className="flex items-center"
          />
          <div className="flex flex-col m-0 p-0 ">
            <p className="m-0 p-0 text-xs font-semibold capitalize">
              {data?.modified_employee?.first_name}
            </p>
            <p className="m-0 p-0 text-xs font-normal capitalize">
              {data?.modified_employee?.position}
            </p>
          </div>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
            <div className="grid grid-cols-1 gap-5">
              <span className="text-sm font-medium m-0 p-0">
                Хүлээлгэж өгсөн
              </span>
              <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                <MigrationCustomCard
                  title="Дугаар"
                  children={
                    <div className="text-xs  font-bold flex gap-2 ">
                      <span className="mt-1">
                        {data?.movement?.unique_number}
                      </span>
                    </div>
                  }
                />
                <MigrationCustomCard
                  title="Ажилтан"
                  children={
                    <div className="flex gap-1 flex-wrap justify-start">
                      {data?.movement?.delivered_employees?.map((el: any) => {
                        return (
                          <div className="flex gap-2 items-center">
                            <div className="flex flex-col m-0 p-0 ">
                              <p className="m-0 p-0 text-xs font-semibold capitalize">
                                {`${el?.last_name?.substring(0, 1)}. ${
                                  el?.first_name
                                }`}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  }
                />
                <MigrationCustomCard
                  title="Асрамжийн газар"
                  children={
                    <div className="text-xs  font-bold flex gap-2 ">
                      <span className="mt-1">
                        {data?.care_center?.organization_name}
                      </span>
                    </div>
                  }
                />

                <MigrationCustomCard
                  title="Хавсралт файл"
                  children={
                    <div className="flex flex-col gap-2 ">
                      {data?.movement?.protocols?.map((el: any) => {
                        return (
                          <Link
                            target="blank"
                            to={
                              el?.physical_path
                                ? file.fileToUrl(el?.physical_path)
                                : ""
                            }
                            className="bg-[#F5F8F8]   text-[#344054]"
                          >
                            <div className="flex gap-1 items-center justify-start">
                              <img src={FilesImage} alt="file image" />
                              <p className="text-xs font-medium m-0 p-0">
                                {el.original_name}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  }
                />
                <MigrationCustomCard
                  title="Тэмдэглэл"
                  children={
                    <div className="flex flex-col gap-2 ">
                      {data?.movement?.notes?.map((el: any) => {
                        return (
                          <Link
                            target="blank"
                            to={
                              el?.physical_path
                                ? file.fileToUrl(el?.physical_path)
                                : ""
                            }
                            className="bg-[#F5F8F8]   text-[#344054]"
                          >
                            <div className="flex gap-1 items-center justify-start">
                              <img src={FilesImage} alt="file image" />
                              <p className="text-xs font-medium m-0 p-0">
                                {el.original_name}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  }
                />
                <MigrationCustomCard
                  title="Хүлээлгэж өгсөн огноо"
                  children={moment(data?.movement?.updated_at).format(
                    "YYYY/MM/DD"
                  )}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={11} className="mr-1">
          <div className="bg-[#F5F8F8] p-[24px] rounded-xl">
            <div className="grid grid-cols-1 gap-5">
              <span className="text-sm font-medium">Хүлээж авсан</span>
              <div className="w-full col-span-1 flex flex-col gap-5 mt-5">
                <MigrationCustomCard
                  title="Нэр"
                  children={
                    <div className="text-xs  font-bold flex gap-2 ">
                      <span className="mt-1">
                        {data?.movement?.received_place?.first_name}
                      </span>
                    </div>
                  }
                />
                <MigrationCustomCard
                  title="Холбоо барих дугаар"
                  children={
                    <div className="text-xs  font-bold flex gap-2 ">
                      <span className="mt-1">
                        {data?.movement?.received_place?.phone_number}
                      </span>
                    </div>
                  }
                />
                <MigrationCustomCard
                  title="Албан тушаал"
                  children={
                    <div className="text-xs  font-bold flex gap-2 ">
                      <span className="mt-1">
                        {data?.movement?.received_place?.position}
                      </span>
                    </div>
                  }
                />
                <MigrationCustomCard
                  title="Хүлээж авсан огноо"
                  children={moment(data?.movement?.updated_at).format(
                    "YYYY/MM/DD"
                  )}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserForce;
