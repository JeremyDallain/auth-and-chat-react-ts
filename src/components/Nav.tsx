import { useSignOut, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { VscDebugDisconnect, VscEdit } from "react-icons/vsc";

export const Nav = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-gray-200 fixed w-full top-0 flex items-center justify-between p-4 z-20">
      <Link
        to={"/"}
        className="border rounded-lg p-2 ml-2 bg-indigo-600 text-white hover:bg-indigo-500"
        onClick={() => navigate("/")}
      >
        Chat Room
      </Link>
      {user && (
        <div className="flex items-center">
          <button
            className="border rounded-lg p-2 ml-2 bg-indigo-600 text-white hover:bg-indigo-500"
            onClick={() => navigate("/update-profile")}
          >
            <VscEdit size={20} />
          </button>
          <button
            className="border rounded-lg p-2 ml-2 bg-red-500 text-white hover:bg-red-400"
            onClick={logout}
          >
            <VscDebugDisconnect size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
