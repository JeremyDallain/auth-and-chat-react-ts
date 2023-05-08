import { useForm } from "react-hook-form";
import "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { ImSpinner } from "react-icons/im";
import { useEffect } from "react";

type FormData = {
  email: string;
  displayName: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm<FormData>();
  const password = watch("password", "");

  const onSubmit = async ({ email, displayName, password }: FormData) => {
    try {
      if (loading) return;
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName });

    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      setError("email", {
        message: "Adresse e-mail déjà utilisée",
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
          Inscription
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
            <label htmlFor="displayName" className="sr-only">
              Pseudo:
            </label>
            <input
              {...register("displayName", { required: "Le pseudo est requis" })}
              id="displayName"
              type="test"
              autoComplete="displayName"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Pseudo"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe:
            </label>
            <input
              {...register("password", {
                required: "Le mot de passe est requis",
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit avoir au moins 6 caractères",
                },
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
          <div>
            <label htmlFor="passwordConfirm" className="sr-only">
              Confirmez le mot de passe:
            </label>
            <input
              {...register("passwordConfirm", {
                required: "La confirmation du mot de passe est requise",
                validate: (value) =>
                  value === password ||
                  "Les mots de passe ne correspondent pas",
              })}
              id="passwordConfirm"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirmer le mot de passe"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center group relative w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            S'inscrire
            {loading && <ImSpinner className="animate-spin ml-2" />}
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
      </div>
    </div>
  );
};

export default Signup;
