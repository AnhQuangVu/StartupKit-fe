// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const menuItemsByRole = {
//   founder: [
//     { label: "Không Gian Làm Việc", path: "/dashboard" },
//     { label: "Quản Lý Hồ Sơ", path: "/profile-management" },
//     { label: "Tạo Dự Án", path: "/create-project" },
//     { label: "Tìm Kiếm Kết Nối", path: "/connections" },
//   ],
//   mentor: [
//     { label: "Mentor Board", path: "/dashboard" },
//     { label: "Dự Án Tư Vấn", path: "/mentor-projects" },
//     { label: "Sự Kiện", path: "/events" },
//     { label: "Kết Nối", path: "/connections" },
//   ],

//   investor: [
//     { label: "Không Gian Làm Việc", path: "/dashboard" },
//     { label: "Xây dựng hồ sơ chuyên gia", path: "/expert-profile" },
//     { label: "Tìm Kiếm Kết Nối", path: "/search-connections" },
//     { label: "Quản lý quy trình đầu tư", path: "/investment-process" },
//   ],

//   admin: [
//     { label: "Admin Panel", path: "/dashboard" },
//     { label: "Quản Lý Người Dùng", path: "/admin-users" },
//     { label: "Quản Lý Dự Án", path: "/admin-projects" },
//     { label: "Sự Kiện", path: "/events" },
//   ],
// };

// const menuItemsLoggedOut = [
//   {
//     label: "Tìm Kiếm Kết Nối",
//     active: true,
//     tooltip: "Tính năng đang phát triển",
//   },
// ];

// import { useAuth } from "../../context/AuthContext";
// export default function DashboardMenu({ isLoggedIn = true, userType }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Lấy vai trò thực tế từ context nếu không truyền vào
//   const { user } = useAuth();
//   const role = userType || user?.role || "founder";
//   let menuItems = isLoggedIn
//     ? [...(menuItemsByRole[role] || menuItemsByRole["founder"])]
//     : [...menuItemsLoggedOut];

//   // Xác định tab đang active dựa trên đường dẫn hiện tại
//   menuItems = menuItems.map((item) => ({
//     ...item,
//     active: location.pathname === item.path,
//   }));

//   // Nếu không có tab nào active, mặc định tab đầu tiên
//   if (!menuItems.some((item) => item.active)) {
//     if (menuItems.length > 0) {
//       menuItems[0] = { ...menuItems[0], active: true };
//     }
//   }

//   // Xử lý điều hướng khi click vào menu item
//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   return (
//     <nav
//       className="flex justify-center items-center py-2 px-2 sm:px-4 md:px-8 bg-transparent mb-4 overflow-x-auto mx-auto max-w-full"
//       style={{ minWidth: 0 }}
//     >
//       <div className="flex gap-2 sm:gap-3 md:gap-4 bg-gray-50 border border-gray-200 rounded-lg shadow px-2 py-1">
//         <style>{`
// 						   .menu-anim {
// 							   transition: background 0.35s cubic-bezier(.4,0,.2,1),
// 													   color 0.35s cubic-bezier(.4,0,.2,1),
// 													   border 0.35s cubic-bezier(.4,0,.2,1),
// 													   box-shadow 0.35s cubic-bezier(.4,0,.2,1),
// 													   transform 0.25s cubic-bezier(.4,0,.2,1);
// 						   }
// 						   .menu-active {
// 							   transform: scale(1.08);
// 						   }
// 					   `}</style>
//         {menuItems.map((item, idx) => (
//           <button
//             key={idx}
//             title={item.tooltip}
//             onClick={() => handleNavigate(item.path)}
//             className={`menu-anim px-2 py-1 text-xs md:text-xs rounded-lg border whitespace-nowrap flex items-center justify-center transition-all duration-200 ${
//               item.active
//                 ? "menu-active border-yellow-400 bg-white text-gray-900 font-semibold shadow-sm"
//                 : "border-transparent bg-gray-50 text-gray-500 hover:bg-white hover:text-yellow-600"
//             } ${
//               !isLoggedIn && item.label === "Tìm Kiếm Kết Nối" ? "relative" : ""
//             }`}
//           >
//             {item.label}
//             {!isLoggedIn && item.label === "Tìm Kiếm Kết Nối" && (
//               <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full"></span>
//             )}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItemsByRole = {
  founder: [
    { label: "Không Gian Làm Việc", path: "/dashboard" },
    { label: "Quản Lý Hồ Sơ", path: "/profile-management" },
    { label: "Tạo Dự Án", path: "/create-project" },
    { label: "Tìm Kiếm Kết Nối", path: "/connections" },
  ],
  mentor: [
    { label: "Mentor Board", path: "/dashboard" },
    { label: "Dự Án Tư Vấn", path: "/connections" },
    { label: "Sự Kiện", path: "/connections" },
    { label: "Kết Nối", path: "/connections" },
  ],
  investor: [
    { label: "Không Gian Làm Việc", path: "/dashboard" },
    { label: "Xây dựng hồ sơ chuyên gia", path: "/connections" },
    { label: "Tìm Kiếm Kết Nối", path: "/connections" },
    { label: "Quản lý quy trình đầu tư", path: "/connections" },
  ],
  admin: [
    { label: "Admin Panel", path: "/dashboard" },
    { label: "Quản Lý Người Dùng", path: "/admin-users" },
    { label: "Quản Lý Dự Án", path: "/admin-projects" },
    { label: "Sự Kiện", path: "/events" },
  ],
};

const menuItemsLoggedOut = [
  {
    label: "Tìm Kiếm Kết Nối",
    path: "#",
    active: true,
    tooltip: "Tính năng đang phát triển",
  },
];

export default function DashboardMenu({ isLoggedIn = true, userType }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy vai trò thực tế từ context nếu không truyền vào
  const { user } = useAuth();
  const role = userType || user?.role || "founder";
  let menuItems = isLoggedIn
    ? [...(menuItemsByRole[role] || menuItemsByRole["founder"])]
    : [...menuItemsLoggedOut];

  // Xác định tab đang active dựa trên đường dẫn hiện tại
  menuItems = menuItems.map((item) => ({
    ...item,
    active: item.path ? location.pathname === item.path : item.active || false,
  }));

  // Nếu không có tab nào active, mặc định tab đầu tiên
  if (!menuItems.some((item) => item.active)) {
    if (menuItems.length > 0) {
      menuItems[0] = { ...menuItems[0], active: true };
    }
  }

  // Xử lý điều hướng khi click vào menu item
  const handleNavigate = (path) => {
    if (!path || path === "#") {
      return;
    }
    navigate(path);
  };

  return (
    <nav
      className="flex justify-center items-center py-2 px-1 sm:px-2 md:px-4 lg:px-8 bg-transparent mb-4 overflow-x-auto mx-auto max-w-full"
      style={{ minWidth: 0 }}
    >
      <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 bg-gray-50 border border-gray-200 rounded-lg shadow px-1 sm:px-2 py-0.5 sm:py-1">
        <style>{`
          .menu-anim {
            transition: background 0.35s cubic-bezier(.4,0,.2,1),
                        color 0.35s cubic-bezier(.4,0,.2,1),
                        border 0.35s cubic-bezier(.4,0,.2,1),
                        box-shadow 0.35s cubic-bezier(.4,0,.2,1),
                        transform 0.25s cubic-bezier(.4,0,.2,1);
          }
          .menu-active {
            transform: scale(1.08);
          }
          @media (max-width: 640px) {
            .menu-active {
              transform: none;
            }
          }
        `}</style>
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            title={item.tooltip}
            onClick={() => handleNavigate(item.path)}
            className={`menu-anim px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs rounded-lg border whitespace-nowrap flex items-center justify-center transition-all duration-200 ${
              item.active
                ? "menu-active border-yellow-400 bg-white text-gray-900 font-semibold shadow-sm"
                : "border-transparent bg-gray-50 text-gray-500 hover:bg-white hover:text-yellow-600"
            } ${
              !isLoggedIn && item.label === "Tìm Kiếm Kết Nối" ? "relative" : ""
            }`}
          >
            {item.label}
            {!isLoggedIn && item.label === "Tìm Kiếm Kết Nối" && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
