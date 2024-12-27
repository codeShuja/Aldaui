import { Route, Routes } from "react-router-dom";
import Page from "../layouts/auth/page";
import LoginLayout from "../layouts/auth/loginl-layout";
import RecoverLayout from "../layouts/auth/recover-layout";
import { ToastProvider } from "../components/ui/ToastContext";
import ToastContainer from "../components/ui/ToastContainer";
import SignupLayout from "../layouts/auth/signup-layout";

function AppRoutes() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<Page />}>
          <Route index element={<LoginLayout />} />
          <Route path="recover" element={<RecoverLayout />} />
          <Route path="signup" element={<SignupLayout />} />
        </Route>
      </Routes>
      <ToastContainer />
    </ToastProvider>
  );
}

export default AppRoutes;
