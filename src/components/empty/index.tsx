import { Empty } from "antd";
import EmptyIcon from "assets/icons/empty.svg";
export const IEmpty = () => {
  return (
    <Empty
      description={
        <div className=" text-gray-900 font-semibold text-sm">Хоосон байна</div>
      }
      image={<img src={EmptyIcon} />}
    />
  );
};
