import axios, { CanceledError } from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
	baseURL: import.meta.env.VITE_API_PREFIX,
	timeout: 30 * 1000,
});

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		// 请求错误处理
		return Promise.reject(error);
	},
);

// 响应拦截器
request.interceptors.response.use(
	(response) => {
		// 根据返回的状态码判断请求是否成功
		const mayBeFailed =
			response.status.toString().startsWith("4") ||
			response.status.toString().startsWith("5");
		if (mayBeFailed) {
			// 请求失败，使用Element Plus的Message组件显示错误信息
			ElMessage.error(response.statusText || "请求失败");
			return Promise.reject(new Error(response.statusText || "请求失败"));
		}
		return response.data;
	},
	(error) => {
		if (error instanceof CanceledError) {
			return Promise.reject(error);
		}
		const { data = {}, status = 0 } = error.response || {};
		// 响应错误处理
		if (status === 401) {
			ElMessage.error("登录过期，请重新登录");
		} else {
			ElMessage.error(data.msg || "请求出错");
		}
		return Promise.reject(error);
	},
);

export { request };
