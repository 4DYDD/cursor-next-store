"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SidebarLink = ({
  href,
  iconClass,
  children,
  isHideText,
  isCollapsed,
}: {
  href: string;
  iconClass: string;
  children: React.ReactNode;
  isHideText: boolean;
  isCollapsed: boolean;
}) => {
  const pathname = usePathname();

  return (
    <li className={`border-l-black border-l-2 pl-2 mb-4`}>
      <Link
        href={href}
        className={`px-3.5 py-2 w-full gap-3 transall ${
          isHideText ? "flexc" : "flexc"
        } rounded font-semibold flexc h-10 ${
          pathname === href
            ? "bg-black text-white"
            : "bg-white text-black hover:bg-black hover:text-white transall clicked"
        }`}
      >
        <span className={`transall !w-3 !h-8 flexc`}>
          <i className={`transall block ${iconClass}`} />
        </span>

        <span
          className={`transall p-0 ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 w-full"
          } ${isHideText && "hidden"}`}
        >
          {children}
        </span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hideText, setHideText] = useState(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleCollapse = () => {
    if (timeoutId) return; // Prevent triggering if animation is still ongoing

    if (!isCollapsed) {
      timeoutId = setTimeout(() => {
        setTimeout(() => {
          setHideText(true);
        }, 50);
        setIsCollapsed(true);
        timeoutId = null; // Reset timeoutId after animation ends
      }, 100); // Delay hiding text until animation ends
    } else {
      timeoutId = setTimeout(() => {
        setTimeout(() => {
          setIsCollapsed(false);
        }, 50);
        setHideText(false);
        timeoutId = null; // Reset timeoutId after animation ends
      }, 100); // Delay showing text until animation ends
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "E") {
        event.preventDefault();
        handleCollapse();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  return (
    <div className="flex z-[10]">
      <div
        className={`text-black shadow h-screen overflow-hidden ${
          isCollapsed ? "w-[90px]" : "w-[256px]"
        } transition-all duration-300`}
      >
        <div
          className={`h-[7vh] flexc ${!isCollapsed && "!justify-between"} px-2`}
        >
          <h2
            className={`relative block h-full text-2xl font-bold text-center transall !duration-300 overflow-hidden ${
              !isCollapsed ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
          >
            <span className="w-[150px] transcenter">Admin Panel</span>
          </h2>
          <button
            onClick={() => {
              handleCollapse();
            }}
            className="px-4 py-2 text-black hover:bg-gray-300 rounded clicked transall"
          >
            <i
              className={`fa-solid ${
                isCollapsed ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>
        </div>

        <ul className="p-4">
          {[
            {
              href: "/admin",
              iconClass: "fa-solid fa-house",
              label: "Home",
            },
            {
              href: "/admin/users",
              iconClass: "fa-solid fa-users",
              label: "Users",
            },
            {
              href: "/admin/products",
              iconClass: "fa-solid fa-box",
              label: "Products",
            },
            {
              href: "/admin/profile",
              iconClass: "fa-solid fa-user",
              label: "Profile",
            },
            {
              href: "/admin/settings",
              iconClass: "fa-solid fa-gear",
              label: "Settings",
            },
          ].map(({ href, iconClass, label }) => (
            <SidebarLink
              key={href}
              href={href}
              iconClass={iconClass}
              isHideText={hideText}
              isCollapsed={isCollapsed}
            >
              {!hideText && label}
            </SidebarLink>
          ))}
        </ul>
      </div>
      <div className="flex-1">{/* Content goes here */}</div>
    </div>
  );
};

export default Sidebar;
