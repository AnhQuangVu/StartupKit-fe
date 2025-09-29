import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItemsLoggedIn = [
	{
		label: "Không Gian Làm Việc",
		path: "/dashboard",
		active: false
	},
	{
		label: "Quản Lý Hồ Sơ",
		path: "/profile-management",
		active: false
	},
	{
		label: "Tạo Dự Án",
		path: "/create-project",
		active: false
	},
	{
		label: "Tìm Kiếm Kết Nối",
		path: "/connections",
		active: false
	}
];

const menuItemsLoggedOut = [
	{
		label: "Tìm Kiếm Kết Nối",
		active: true,
		tooltip: "Tính năng đang phát triển"
	}
];

export default function DashboardMenu({ isLoggedIn = true }) {
	const navigate = useNavigate();
	const location = useLocation();
	
	// Chọn menu items dựa vào trạng thái đăng nhập
	let menuItems = isLoggedIn ? [...menuItemsLoggedIn] : [...menuItemsLoggedOut];
	
	// Xác định tab đang active dựa trên đường dẫn hiện tại
	menuItems = menuItems.map(item => ({
		...item,
		active: location.pathname === item.path
	}));
	
	// Nếu không có tab nào active, mặc định tab đầu tiên
	if (!menuItems.some(item => item.active)) {
		if (menuItems.length > 0) {
			menuItems[0] = { ...menuItems[0], active: true };
		}
	}

	// Xử lý điều hướng khi click vào menu item
	const handleNavigate = (path) => {
		navigate(path);
	};

		return (
			<nav className="flex gap-2 md:gap-4 py-1 px-[30px] bg-gray-50 rounded-lg border border-gray-200 mb-4 overflow-x-auto mx-auto" style={{ width: '1430px', transform: 'translateX(9px)' }}>
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
				`}</style>
				{menuItems.map((item, idx) => (
					<button
						key={idx}
						title={item.tooltip}
						onClick={() => handleNavigate(item.path)}
						className={`menu-anim px-3 py-1 text-xs md:text-xs rounded-lg border whitespace-nowrap ${
							item.active
								? "menu-active border-yellow-400 bg-white text-gray-900 font-semibold shadow-sm"
								: "border-transparent bg-gray-50 text-gray-500 hover:bg-white hover:text-yellow-600"
						} ${!isLoggedIn && item.label === "Tìm Kiếm Kết Nối" ? "relative" : ""}`}
					>
						{item.label}
						{!isLoggedIn && item.label === "Tìm Kiếm Kết Nối" && (
							<span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full"></span>
						)}
					</button>
				))}
			</nav>
		);
}
