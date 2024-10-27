// import { GenerateBetaKey } from "@/api/interface";
import { PORT2 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 登录模块
 */
// export const getKeyApi = (params: GenerateBetaKey.ReqGenerateBetaKey) => {
// 	return http.post<GenerateBetaKey.ReqGenerateBetaKey>(PORT3 + `/generate-beta-key`, params);
// };
// 目前使用静态数据
// export const getTokenApi = async () => {
// 	const params: GenerateBetaKey.ReqGenerateBetaKey = {
// 		quota: 100,
// 		secret: "hAJr-dqrISAlwlxj",
// 		vip: 1
// 	};
// 	const { data } = await getKeyApi(params);
// 	return http.post<GenerateBetaKey.ReqGenerateBetaKey>(PORT3 + `/login-via-beta-key?key=${data}`);
// };

export const getTokenApi = async (key: string) => {
	return http.post(PORT2 + `/login-beta?key=${key}`, {}, { headers: { noLoading: true } });
};
