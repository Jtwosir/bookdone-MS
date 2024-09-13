import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 超级表格模块
const proTableRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "自定义表格"
		},
		children: [
			{
				path: "/customTable/usersTable",
				element: lazyLoad(React.lazy(() => import("@/views/customTable/usersTable"))),
				meta: {
					requiresAuth: false,
					title: "用户管理",
					key: "useHooks"
				}
			},
			{
				path: "/customTable/booksTable",
				element: lazyLoad(React.lazy(() => import("@/views/customTable/booksTable"))),
				meta: {
					requiresAuth: false,
					title: "图书管理",
					key: "useHooks"
				}
			}
		]
	}
];

export default proTableRouter;
