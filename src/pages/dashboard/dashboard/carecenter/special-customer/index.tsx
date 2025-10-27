import { EllipsisOutlined } from "@ant-design/icons";
import { CustomDashboardCard } from "components/card";
import { CareCenter } from "service/dashboard/types";
import { SpecialGender } from "./gender";
import { SpecialNeedType } from "./type";
type Props = {
  data?: CareCenter;
  loading?: boolean;
};
export const SpecialCustomer = ({ data, loading }: Props) => {
  return (
    <CustomDashboardCard
      className="bg-white "
      loading={loading}
      title={"Тусгай хэрэгцээт үйлчлүүлэгчдийн мэдээлэл"}
      rightTop={<EllipsisOutlined rev={undefined} />}
    >
      <div className="space-y-6 ">
        {/* Тусгай хэрэгцээний төрөл */}
        <SpecialNeedType data={data?.disability?.types} />
        {/* ХЧА Нас болон хүйсээр */}
        <SpecialGender data={data?.disability?.age_and_gender} />
      </div>
    </CustomDashboardCard>
  );
};
