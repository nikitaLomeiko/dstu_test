import { Rating } from "shared/ui/rating";
import { IoMdSend } from "react-icons/io";
import { IBaseComponent } from "shared/general/types/base-component.type";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IReview } from "entities/review";
import { Controller, useForm } from "react-hook-form";

interface IProps extends IBaseComponent {
  onCancel?: () => void;
  initialForm?: Partial<IReview>;
  onPresent: (data: IReview, clearFunc: () => void) => void;
  error?: string;
  categoryConfig: string[],
  isChanged?: boolean
}

export const ReviewForm: React.FC<IProps> = (props) => {
  const { className, css, onCancel, initialForm, onPresent, error, categoryConfig, isChanged } = props;

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IReview>({ defaultValues: initialForm });

  const onSubmit = handleSubmit((data) => {
    onPresent(
      {
        ...data,
        date: isChanged ? data.date : new Date().toLocaleDateString("ru-RU"),
        dateUpdate: isChanged ? new Date().toLocaleDateString("ru-RU"): '',
        timestamp: new Date().getTime()
      },
      () => {
        clearErrors();
        reset();
      }
    );
  });

  return (
    <form onSubmit={onSubmit} className={`border-b pb-4 ${className}`} style={css}>
      <div className="mb-3">
        <label htmlFor="nicknameInput" className="form-label">
          Введите ваше имя
        </label>
        <input
          {...register("nickname", {
            required: true,
            maxLength: { value: 60, message: "Имя не может быть больше 60 символов" },
          })}
          type="text"
          className={`form-control focus:!outline-none focus:!ring-0 form-control-sm ${
            errors.nickname?.message !== undefined ? "!border-red-500" : ""
          }`}
          id="nicknameInput"
          placeholder="Иван Петрович"
        />
        {errors.nickname?.message !== undefined && <p className="text-md text-red-500">{errors.nickname?.message}</p>}
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="inputState" className="form-label">
          Категория
        </label>
        <select
          {...register("category", { required: true })}
          id="inputState"
          className={`form-select focus:!outline-none focus:!ring-0 form-select-sm ${
            errors.category?.message !== undefined ? "!border-red-500" : ""
          }`}
        >
          {categoryConfig.map((item, index) => <option key={index} value={item} selected={index === 0}>{item}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="commentTextarea" className="form-label">
          Расскажите о своих впечатлениях, что вам понравилось, что не понравилось?
        </label>
        <textarea
          {...register("comment", {
            required: true,
            minLength: { value: 20, message: "Сообщение не должно быть меньше 20 символов" },
            maxLength: { value: 2000, message: "Сообщение не должно превышать 2000 символов" },
          })}
          placeholder="Мне очень понравилось..."
          className={`form-control focus:!outline-none focus:!ring-0 form-control-sm ${
            errors.comment?.message !== undefined ? "!border-red-500" : ""
          }`}
          id="commentTextarea"
          rows={5}
        ></textarea>
        {errors.comment?.message !== undefined && <p className="text-md text-red-500">{errors.comment?.message}</p>}
      </div>
      {error !== undefined && <p className="text-md text-red-500">{error}</p>}
      <div className="flex flex-row justify-between items-center">
        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => <Rating onChange={onChange} rating={value} />}
        />
        <div className="flex flex-row gap-2">
          {onCancel && (
            <button onClick={onCancel} type="button" className="btn btn-danger">
              <RxCross2 />
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            <IoMdSend size={18} />
          </button>
        </div>
      </div>
    </form>
  );
};
