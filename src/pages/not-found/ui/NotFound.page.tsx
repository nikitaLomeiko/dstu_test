import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/route";

export const NotFoundPage = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full h-screen -mt-10 flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-row gap-4 items-end">
        <h1 className="!text-6xl !text-red-600">404</h1>
        <p className="text-4xl !mb-2 !text-red-500">Страница не найдена  :/</p>
      </div>
      <button onClick={() => navigate(RoutePath.reviews.path)} type="button" className="btn btn-primary">Вернуться на гланвую</button>
    </div>
  );
};
