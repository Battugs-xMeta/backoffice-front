import { ReactNode } from "react";
import { RiUserSettingsFill } from "react-icons/ri";

export type BreadcrumbsProps = {
  path: ReactNode | string;
  subPath?: ReactNode | string;
  className?: string;
  separator?: ReactNode | string;
};

export const Breadcrumbs = ({
  path,
  subPath,
  className,
  separator = "/",
}: BreadcrumbsProps) => {
  return (
    <div
      className={`flex items-center mb-3 ${className || ""}`}
      style={{ gap: 16, paddingTop: 21 }}
    >
      <RiUserSettingsFill size={23} />

      <div style={{ fontSize: 18, fontWeight: 500 }}>{separator}</div>

      <div className="flex items-center gap-2">
        <p style={{ fontSize: 18, fontWeight: 600 }}>{path}</p>
      </div>

      {subPath !== undefined && subPath !== null && subPath !== "" ? (
        <>
          <div style={{ fontSize: 18, fontWeight: 500 }}>{separator}</div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm text-gray-700 capitalize">
              {subPath}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};
