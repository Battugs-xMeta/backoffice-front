import { Card, Skeleton } from "antd";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa6";

interface CustomCardProps {
  title: string;
  children: ReactNode;
  rightTop?: ReactNode;
  subTitle?: string;
  className?: string;
  small?: boolean;
  fixedHeightTitle?: boolean;
  loading?: boolean;
  bodyClassName?: string;
}

export const CustomDashboardCard = ({
  title,
  children,
  rightTop,
  subTitle,
  className,
  small,
  fixedHeightTitle,
  loading,
  bodyClassName,
}: CustomCardProps) => {
  return (
    <div
      className={`p-4 rounded-xl bg-[#F5F8F8] border border-[#D0D5DD] space-y-4 ${
        small ? "p-4" : "p-8"
      } ${className} `}
      style={{
        border: "1px solid #D0D5DD",
      }}
    >
      <div className="flex items-start justify-between gap-4 md:flex-row flex-col">
        <div
          style={{
            height: fixedHeightTitle ? "8px !important" : "auto",
          }}
        >
          <p
            className={`font-semibold  text-[#344054] ${
              small ? "text-base" : "text-lg"
            }`}
          >
            {title}
          </p>
          <p className="text-sm text-[#475467]">{subTitle}</p>
        </div>
        {rightTop}
      </div>
      <Skeleton loading={loading} active>
        <div className={`w-full ${bodyClassName}`}>{children}</div>
      </Skeleton>
    </div>
  );
};

interface ArrowCardProps {
  title: string;

  number?: number;
  href?: string;
  loading?: boolean;
}
export const ArrowCard = ({ title, number, href, loading }: ArrowCardProps) => {
  return (
    <Skeleton loading={loading} active>
      <div
        className="p-4 rounded-xl bg-white border border-[#D0D5DD] group"
        style={{
          border: "1px solid #D0D5DD",
        }}
      >
        <h1 className=" font-semibold text-base text-[#101828]">{title}</h1>
        <div className=" w-full flex justify-between items-center text-3xl text-[#6759CE]">
          <div>
            <p className="font-semibold m-0 p-0">{number}</p>
          </div>
          <div>
            <FaArrowRight
              color="#6759CE"
              size={18}
              className=" group-hover:translate-x-1 translate-x-0 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

interface WhiteCardProps {
  title: string;
  children: ReactNode;
  loading?: boolean;
  secondTitle?: string;
}
export const WhiteCard = ({
  title,
  children,
  loading,
  secondTitle,
}: WhiteCardProps) => {
  return (
    <Skeleton loading={loading} active>
      <div
        className="p-4 rounded-xl bg-white border border-[#D0D5DD] group flex flex-col justify-between gap-4"
        style={{
          border: "1px solid #D0D5DD",
        }}
      >
        <div className="flex items-center justify-between h-7">
          <p className=" font-semibold text-base text-[#101828]">{title}</p>
          <p className=" font-semibold text-base text-[#101828]">
            {secondTitle}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </Skeleton>
  );
};

type PageCardProps = {
  children: ReactNode;
  className?: string;
  xR?: boolean;
  yR?: boolean;
  title?: string;
  extra?: ReactNode;
  bodyClassName?: string;
  titleClassName?: string;
};
export const PageCard = ({
  children,
  className,
  xR,
  yR,
  title,
  extra,
  bodyClassName,
  titleClassName,
}: PageCardProps) => {
  return (
    <Card
      bodyStyle={{ padding: 0 }}
      headStyle={{ display: "none" }}
      className={`p-4 ${xR && "px-0"} ${yR && "py-0"} ${className}`}
      bordered={false}
    >
      <div className={` ${bodyClassName} `}>
        <div className={`flex items-center justify-between ${titleClassName}`}>
          <div className="font-bold text-base text-scale-700">{title}</div>
          {extra}
        </div>
        <div>{children}</div>
      </div>
    </Card>
  );
};
