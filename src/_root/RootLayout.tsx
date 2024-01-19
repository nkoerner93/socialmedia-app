import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import TopBar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <LeftSidebar />

      <div className="flex flex-col w-full h-screen">
        <TopBar />

        <section className="flex-1 overflow-y-auto">
          <Outlet />
        </section>

        <Bottombar />
      </div>
    </div>
  );
};

export default RootLayout;
