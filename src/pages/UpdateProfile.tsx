import {
  useAuthState,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

type FormData = {
  email: string;
  displayName: string;
  password: string;
  passwordConfirm: string;
};

export const UpdateProfile = () => {
  const [updateEmail] = useUpdateEmail(auth);
  const [updatePassword] = useUpdatePassword(auth);  
  const [updateProfile] = useUpdateProfile(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const password = watch("password", "");

  const onSubmit = async ({ email, displayName, password }: FormData) => {
    try {
      if (email !== user?.email) {
        await updateEmail(email);
      }
      if (password) {
        await updatePassword(password);
      }
      if (displayName  !== user?.displayName) {
        await updateProfile({displayName});
      }
      navigate("/");
    } catch (error: any) {
      alert("Erreur lors de l'inscription: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Modifier le profil
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
              defaultValue={user?.email ?? ""}
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
              defaultValue={user?.displayName ?? ""}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Pseudo"
            />
            {errors.displayName && (
              <p className="text-red-500 text-sm">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">laisser vide pour ne pas modifier le mot de passe</p>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe:
            </label>
            <input
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit avoir au moins 6 caractères",
                },
              })}
              id="password"
              type="password"
              autoComplete="current-password"
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
                validate: (value) =>
                  value === password ||
                  "Les mots de passe ne correspondent pas",
              })}
              id="passwordConfirm"
              type="password"
              autoComplete="current-password"
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
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Modifier
          </button>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Retour
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UpdateProfile;
