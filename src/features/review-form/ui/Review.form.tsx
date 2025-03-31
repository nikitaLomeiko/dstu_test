import { Rating } from "shared/ui/rating";
import { IoMdSend } from "react-icons/io";

export const ReviewForm = () => {
  return (
    <form className="border-b pb-4">
      <div className="mb-3">
        <label htmlFor="nicknameInput" className="form-label">
          Введите ваше имя
        </label>
        <input type="text" className="form-control form-control-sm" id="nicknameInput" placeholder="Иван Петрович" />
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="inputState" className="form-label">
          Категория
        </label>
        <select id="inputState" className="form-select form-select-sm">
          <option selected>Рестораны</option>
          <option>Книги</option>
          <option>Игры</option>
          <option>Фильмы</option>
          <option>Технологии</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="commentTextarea" className="form-label">
          Расскажите о своих впечатлениях, что вам понравилось, что не понравилось?
        </label>
        <textarea
          placeholder="Мне очень понравилось..."
          className="form-control form-control-sm"
          id="commentTextarea"
          rows={5}
        ></textarea>
      </div>
      <div className="flex flex-row justify-between items-center">
        <Rating rating={0}/>
        <button type="button" className="btn btn-primary">
          <IoMdSend size={18}/>
        </button>
      </div>
    </form>
  );
};
