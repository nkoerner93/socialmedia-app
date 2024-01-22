import { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Skeleton } from "../ui/skeleton";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={"/"} className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={130} height={325} />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="profile" className="h-8 w-8 rounded-full" />
          ) : (
            <Skeleton className="h-8 w-8 rounded-full" />
          )}
          <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="small-regular text-light-4">@{user.username}</span>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}
              >
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  ></img>
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
