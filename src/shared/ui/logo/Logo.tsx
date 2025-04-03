import { FaRegNoteSticky } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/route";

export const Logo = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(RoutePath.reviews.path)} className="flex flex-row gap-2 items-center">
      <FaRegNoteSticky size={32} fill="#fff"/>
      <div>
        <h1 className="!text-2xl text-white lg:!text-3xl">Отзывы</h1>
        <h2 className="!text-[10px] lg:!text-[12px] !text-white/70 !-mt-1 !ml-1">Тестовое задание для ДГТУ</h2>
      </div>
    </div>
  );
};
