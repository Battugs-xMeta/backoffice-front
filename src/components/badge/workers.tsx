import { FC } from "react";

interface Props {
  status?: 0 | 1 | 2 | 3 | 4 | Number;
  desc?: String;
}

const Badge: FC<Props> = ({ status, desc }) => {
  let text = "Хадгалагдсан";
  let colorClass = "bg-gray-100 text-gray-700";
  switch (status) {
    case 0:
      text = "Захирал";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case 1:
      text = "Үйлчлэгч";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case 2:
      text = "Асрагч";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case 3:
      text = "Мэргэжилтэн";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case 4:
      text = "Хүний нөөц";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case 5:
      text = "Менежер";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case 6:
      text = "Ахлах мэргэжилтэн";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-700";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${colorClass}`}
    >
      {desc || text}
    </span>
  );
};

export default Badge;
