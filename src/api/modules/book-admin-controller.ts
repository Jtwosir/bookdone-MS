import { BookList } from "@/api/interface";
import { PORT4 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 获取用户列表模块
 */
export const getBooksListApi = (params: BookList.ReqBookListQuery) => {
	return http.post<BookList.ReqBookListQuery>(PORT4 + `/page`, params, { headers: { noLoading: true } });
};
