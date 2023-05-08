import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";

type FormData = {
  email: string;
};

export const ForgotPassword = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  async function onSubmit({ email }: FormData) {
    setIsLoading(true)
    try {
      const success = await sendPasswordResetEmail(email);
      if (success) {
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (error) {
      setIsLoading(false)
      setError("email", {
        message: "Adresse e-mail inconnue",
      });
    }
  }, [error, setError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email:
            </label>
            <input
              {...register("email", { required: "L'email est requis" })}
              id="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Adresse e-mail"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="items-center group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset password
            {isLoading && <ImSpinner className="animate-spin ml-2" />}
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Se connecter
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Besoin d'un compte ? {""}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};
