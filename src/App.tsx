import { Route, Routes } from "react-router-dom";
import { Chat } from "./pages/Chat";
import Login from "./pages/Login";
import { PrivateRoutes } from "./layout/PrivateRoutes";
import Signup from "./pages/Signup";
import { Nav } from "./components/Nav";
import UpdateProfile from "./pages/UpdateProfile";
import { ForgotPassword } from "./pages/ForgorPassword";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route index element={<Chat />} />
          <Route path="update-profile" element={<UpdateProfile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
