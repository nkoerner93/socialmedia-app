import { Routes, Route } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import { Home } from "./_root/pages";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "./lib/react-query/QueryProvider";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <main className="flex h-screen">
          <Routes>
            {/* public routes */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SigninForm />} />
              <Route path="/sign-up" element={<SignupForm />} />
            </Route>
            {/* private routes */}
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
          <Toaster />
        </main>
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
