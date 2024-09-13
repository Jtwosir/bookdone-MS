import { UserList } from "@/api/interface";
import { PORT2 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 获取用户列表模块
 */
export const getUsersListApi = (params: UserList.ReqUserListQuery) => {
	return http.post<UserList.ResUserList>(PORT2 + `/page`, params, { headers: { noLoading: true } });
};

/**
 * @name 账号操作改变用户状态
 */
export const changeUserStatusApi = (params: { status: number; userId: number }) => {
	return http.put(PORT2 + `/status?status=${params.status}&userId=${params.userId}`, undefined, {
		headers: { noLoading: true, "Content-Type": "application/x-www-form-urlencoded" }
	});
};

// export const changeUserStatusApi = (params: { status: number; userId: number }) => {
// 	return http.post(PORT2 + `/status?status=${params.status}&userId=${params.userId}`, params, {
// 		headers: { noLoading: true }
// 	});
// };
