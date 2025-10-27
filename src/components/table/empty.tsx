import EmptyIcon from "assets/icons/empty.png";

export const TableEmpty = () => {
  return (
    <div className="py-10">
      <img src={EmptyIcon} width={152} />
      <div className="text-gray-900 font-semibold text-base">Хоосон байна</div>
    </div>
  );
};
