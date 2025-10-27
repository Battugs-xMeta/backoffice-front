import { Col, Row } from "antd";
import React from "react";

type Props = {
  label?: string;
  children: React.ReactNode;
};
export const SectionContainer = ({ label, children }: Props) => {
  return (
    <Row>
      <Col span={24}>
        <div className="text-[#1D2939] text-lg font-medium mb-3 my-0">
          {label}
        </div>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

type PropsSection = {
  label?: string;
  children: React.ReactNode;
};
type PropsTwoSection = {
  label?: string;
  children: React.ReactNode;
  children2: React.ReactNode;
};
type PropsThreeSection = {
  label?: string;
  children: React.ReactNode;
  children2: React.ReactNode;
  children3: React.ReactNode;
};
export const SectionField = ({ label, children }: PropsSection) => {
  return (
    <div>
      <div className="mb-2 w-full">
        <label className="text-gray-700 text-sm font-medium ">{label}</label>
      </div>
      {children}
    </div>
  );
};
export const SectionTwoField = ({
  label,
  children,
  children2,
}: PropsTwoSection) => {
  return (
    <div>
      <div className="mb-2 w-full">
        <label className="text-gray-700 text-sm font-medium ">{label}</label>
      </div>
      <div className="flex gap-2">
        {children}
        {children2}
      </div>
    </div>
  );
};
export const SectionThreeField = ({
  label,
  children,
  children2,
  children3,
}: PropsThreeSection) => {
  return (
    <div>
      <div className="mb-2 w-full">
        <label className="text-gray-700 text-sm font-medium ">{label}</label>
      </div>
      <div className="flex gap-2">
        {children}
        {children2}
        {children3}
      </div>
    </div>
  );
};

export const SectionInlineField = ({ label, children }: PropsSection) => {
  return (
    <div className="flex justify-between">
      <div className="w-full">
        <label className="text-gray-700 text-sm font-medium ">{label}</label>
      </div>
      {children}
    </div>
  );
};
