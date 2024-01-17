import { FaRegCircleXmark } from "react-icons/fa6";

export const Notification = ({ message, total, currentValue }) => {
  return (
    <div className="absolute w-[20rem] bg-green-400 text-black rounded-md m-2">
      <div className="flex justify-end pt-2 pr-2">
        <i>
          <FaRegCircleXmark
            size={20}
            className="hover:cursor-pointer hover:text-white "
          />
        </i>
      </div>
      <div className="flex place-content-center px-4 pb-4">
        <p>{message}</p>
      </div>
      <progress
        max={total}
        value={currentValue}
        className="h-[5px] w-full"
      ></progress>
    </div>
  );
};
