import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Send from "../assets/send.svg";

const schema = yup.object({
  text: yup
    .string()
    .required("Escribe un mensaje")
    .min(2, "Muy corto")
    .max(200, "Demasiado largo"),
});

const MessageForm = ({ onSend, disabled }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onSend(data.text);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-4 bg-neutral-700 rounded-xl p-3 relative m-4"
    >
      <input
        {...register("text")}
        placeholder={
          disabled ? "Esperando respuesta del bot..." : "Escribe tu mensaje..."
        }
        className="flex-1 px-4 py-2 rounded-md bg-neutral-700 text-white focus:outline-none disabled:opacity-50"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-white p-2 rounded-full disabled:opacity-50"
      >
        <img src={Send} alt="Enviar" className="w-5 h-5" />
      </button>
      {errors.text && (
        <p className="text-red-500 text-sm mt-1 absolute -bottom-6">
          {errors.text.message}
        </p>
      )}
    </form>
  );
};

export default MessageForm;
