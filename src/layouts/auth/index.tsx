import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-10">
      <div
        className="hidden sm:block col-span-7 h-screen "
        style={{
          backgroundImage: "url('/asramj/background/login.svg')",
          backgroundSize: "cover",
          backgroundColor: "",
        }}
      >
        <div className="bg-[#144E5A] hidden sm:block col-span-3 h-screen opacity-70 relative">
          <div className="flex items-start flex-col justify-end h-full absolute bottom-24 left-32 gap-6">
            <div className="text-white text-6xl">
              Асрамжийн газрын удирдлага
            </div>
            <div className="text-white text-2xl">
              Төрөлжсөн ахмадын асрамжийн газрын систем
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-span-3 w-full h-screen flex justify-center items-center xs:w-full"
        style={{
          backgroundSize: "cover",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
