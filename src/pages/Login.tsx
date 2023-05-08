import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { ImSpinner } from "react-icons/im";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect } from "react";

type FormData = {
  email: string;
  password: string;
};

const LogIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (loading) return;
    try {
      signInWithEmailAndPassword(data.email, data.password);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      setError("password", {
        message: "Adresse e-mail ou mot de passe incorrect",
      });
    }
  }, [error, setError]);

  if (user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Se connecter
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
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe:
            </label>
            <input
              {...register("password", {
                required: "Le mot de passe est requis",
              })}
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="group relative w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          >
            Se connecter
            {loading && <ImSpinner className="animate-spin ml-2" />}
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link
            to="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Mot de passe oublié ?
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

export default LogIn;
