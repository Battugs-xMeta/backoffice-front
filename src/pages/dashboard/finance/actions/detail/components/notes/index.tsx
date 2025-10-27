import { useRequest } from "ahooks";
import { notification } from "antd";
import { CreateButton, ITable } from "components/index";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import careInformation from "service/care-information";
import { NoteListType } from "service/care-information/types";
import file from "service/file";
import { Elderlys } from "service/requested/types";
import { atomWorkersForm } from "utils/store";
import { AddNotes } from "./add_notes";
import { UpdateService } from "./update";

type NotesType = {
  data?: Elderlys;
};

export const Notes: React.FC<NotesType> = ({ data }) => {
  const [form, setForm] = useAtom(atomWorkersForm);
  const [visibleModal, setVisibleModal] = useState<number>();

  const list = useRequest(careInformation.noteList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      elderly_id: data?.id || 0,
      ...form,
    });
  };

  useEffect(() => {
    run();
  }, [visibleModal, form]);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Тэмдэглэл</p>
        <CreateButton
          size="large"
          onClick={() => setVisibleModal?.(data?.id as number)}
          addButtonName="Нэмэх"
          disabled
        />
      </div>
      <ITable<NoteListType>
        scroll={false}
        dataSource={list.data?.items ?? []}
        total={list.data?.total || 0}
        loading={list.loading}
        refresh={(values) =>
          list.run({ ...form, ...values, elderly_id: data?.id })
        }
        actionWidth={10}
        hidePagination
        form={form}
        setForm={setForm}
        UpdateComponent={UpdateService}
        columns={[
          {
            dataIndex: ["date"],
            title: "Огноо",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: ["description"],
            title: "Тайлбар",
            align: "start",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "care_center_elderly_note_files",
            title: "Хавсралт файл",
            align: "start",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                <ul>
                  {record?.care_center_elderly_note_files?.map(
                    (noteFile, index) => {
                      return (
                        <Link
                          to={file.fileToUrl(noteFile?.physical_path)}
                          className="cursor-pointer  text-gray-700"
                          target="blank"
                          download
                        >
                          <li> Хавсралт #{index + 1}</li>
                        </Link>
                      );
                    }
                  )}
                </ul>
              </span>
            ),
          },
        ]}
      />
      <AddNotes
        data={visibleModal}
        onCancel={() => setVisibleModal(undefined)}
        onFinish={async () => {
          // run();
          setVisibleModal(undefined);
        }}
      />
    </div>
  );
};
