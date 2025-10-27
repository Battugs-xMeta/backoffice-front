import { Button, Drawer, Tooltip } from "antd";
import { useState } from "react";
import { MdEditDocument } from "react-icons/md";
import { useLocation } from "react-router-dom";

export const Settings = () => {
  const data = [
    {
      path: "/dashboard/dashboard",
      url: "/asramj/settings/dashboard.pdf",
      video_url: "https://youtu.be/xp7cfLcAGEo",
      name: "Нүүр хуудас",
    },
    {
      path: "/registration",
      url: "/asramj/settings/registration.pdf",
      video_url: "https://youtu.be/7CaWHn0Yd4w",
      name: "Байгууллагын мэдээлэл",
    },
    {
      path: "/report",
      url: "/asramj/settings/report.pdf",
      video_url: "https://youtu.be/qB5NmRPV1OQ",
      name: "Тайлан мэдээ",
    },
    {
      path: "/credentials",
      url: "/asramj/settings/credentials.pdf",
      video_url: "https://youtu.be/QRRZCUGVlKA",
      name: "Магадлан итгэмжлэл",
    },
    {
      path: "/finance",
      url: "/asramj/settings/finance.pdf",
      video_url: "https://youtu.be/XBHgYeWG850",
      name: "Санхүү",
    },
    {
      path: "/workers",
      url: "/asramj/settings/workers.pdf",
      video_url: "https://youtu.be/Dycabc7-AJ8",
      name: "Ажилчдын жагсаалт",
    },
    {
      path: "/training",
      url: "/asramj/settings/training.pdf",
      video_url: "https://youtu.be/PM2JFMsWiXI",
      name: "Сургалт хөгжил",
    },
    {
      path: "/role-management",
      video_url: "https://youtu.be/kqvxnkUvmx8",
      name: "Эрхийн тохиргоо",
    },
    {
      path: "/requested",
      url: "/asramj/settings/requested.pdf",
      video_url: "https://youtu.be/Mz-IesVaN_s",
      name: "Хүсэлт",
    },
    {
      path: "/care-information",
      url: "/asramj/settings/care-information.pdf",
      video_url: "https://youtu.be/p5Cj_5nbQeM",
      name: "Үйлчлүүлэгчдийн жагсаалт",
    },
    {
      path: "/transictions",
      url: "/asramj/settings/transictions.pdf",
      video_url: "https://youtu.be/iIDdLedlzEw",
      name: "Шилжилт хөдөлгөөн",
    },
    {
      path: "/developer-plan",
      url: "/asramj/settings/developer-plan.pdf",
      video_url: "https://youtu.be/cZr6_vdgtw8",
      name: "Хөгжлийн төлөвлөгөө",
    },
    {
      path: "/charity-organization",
      url: "/asramj/settings/charity-organization.pdf",
      video_url: "https://youtu.be/ceQnEn76Fh0",
      name: "Буяны байгууллага",
    },
    {
      path: "/settings",
      video_url: "https://youtu.be/zbiFb5RpzXs",
      name: "Тохиргоо",
    },
  ];

  const location = useLocation();
  const [open, setOpen] = useState(false);

  const found = data.find((el) => location.pathname.includes(el.path));

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 right-0 content-center">
        <Tooltip
          title={<p className="text-xs">Гарын авлага</p>}
          placement="leftBottom"
        >
          <Button
            icon={<MdEditDocument size={25} color="#fff" />}
            color="#144E5A"
            className="bg-[#144E5A] rounded-none rounded-l-lg"
            size="large"
            onClick={showDrawer}
          />
        </Tooltip>
      </div>
      <Drawer title="Гарын авлага" onClose={onClose} open={open} width={850}>
      <Button className="m-2 text-lg flex items-center" type="primary">
          <a
            href={found?.video_url}
            className="text-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Видео заавар :<span className="ml-1">{found?.name}</span>
          </a>
        </Button>
        {found?.url === "/asramj/settings/care-information.pdf" && (
          <div className="m-2 text-lg">
            Видео заавар:
            <a
              href={"https://youtu.be/THeILFDPkQg"}
              className="text-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ml-1">Хөгжлийн төлөвлөгөө</span>
            </a>
          </div>
        )}

        {found?.url && (
          <iframe src={found?.url} className="w-full h-full"></iframe>
        )}
      </Drawer>
    </>
  );
};
