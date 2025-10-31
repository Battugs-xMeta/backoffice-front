interface Props {
  title: string;
  color?:
    | "gray"
    | "green"
    | "red"
    | "yellow"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
    | string;
}

const Badge = ({ title, color }: Props) => {
  let colorClass = "bg-gray-100 text-gray-700 border-[#efefef]";
  switch (color) {
    case "gray":
      colorClass = "bg-gray-100 text-gray-700 border-[#efefef]";
      break;
    case "green":
      colorClass = "bg-[#E8FDED] text-[#1D9E4A] border-[#A7E6B6]";
      break;
    case "red":
      colorClass = "bg-[#FDE8E8] text-[#D93025] border-[#F8BFBF]";
      break;
    case "yellow":
      colorClass = "bg-[#FFF8E1] text-[#B38705] border-[#FFE58F]";
      break;
    case "blue":
      colorClass = "bg-blue-100 text-blue-700 border-[#efefef]";
      break;
    case "indigo":
      colorClass = "bg-indigo-100 text-indigo-700 border-[#efefef]";
      break;
    case "purple":
      colorClass = "bg-purple-100 text-purple-700 border-[#efefef]";
      break;
    case "pink":
      colorClass = "bg-pink-100 text-pink-700 border-[#efefef]";
      break;
    default:
      colorClass = "bg-white text-gray-700 border-[#efefef]";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs border font-medium truncate ${colorClass}`}
    >
      {title}
    </span>
  );
};

export default Badge;
