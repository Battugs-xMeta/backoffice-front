import FileIcon from "assets/government/icons/file.svg";
import { Link } from "react-router-dom";
import file from "service/file";
import { FileInterface } from "service/file/types";
import { formatKB } from "utils/index";

type Props = {
  data?: FileInterface;
  className?: string;
  width?: number;
  height?: number;
  staticFileIcon?: boolean;
};
export const FileRender = ({
  data,
  width = 44,
  height = 44,
  className,
  staticFileIcon = false,
}: Props) => {
  return (
    <Link
      target="blank"
      to={file.fileToUrl(data?.physical_path || "")}
      className={`flex  px-4 py-2 rounded-lg gap-3 text-[#344054] ${className}`}
    >
      <img
        src={
          data && !staticFileIcon
            ? file.fileToUrl(data?.physical_path || "")
            : FileIcon
        }
        alt="file"
        width={width}
        height={height}
        className="object-cover rounded-md "
      />
      <div className="flex flex-col gap-1">
        <div className=" text-scale-600 font-bold text-xs">
          {data?.file_name}
        </div>
        <div className="text-xs">Хэмжээ: {formatKB(data?.file_size!, 1)}</div>
      </div>
    </Link>
  );
};
