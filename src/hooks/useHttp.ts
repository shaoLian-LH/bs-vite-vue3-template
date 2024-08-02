import type { AxiosRequestConfig, CancelTokenSource } from "axios";
import axios from "axios";
import { onUnmounted, ref, type Ref, getCurrentInstance } from "vue";
import { request } from "@/utils/request";
import { ElMessage } from "element-plus";

export interface BaseResponseWrapper<T> {
	code: number;
	data: T | undefined;
	timestamp: string;
	success: boolean;
	msg?: string;
	message?: string;
	resultData?: T | undefined;
	resultMsg?: string;
}

export interface UseHttpReturn<T> {
	data: Ref<T | undefined>;
	error: Ref<Error | undefined>;
	loading: Ref<boolean>;
	execute: (
		config?: AxiosRequestConfig,
	) => Promise<BaseResponseWrapper<T | undefined>>;
	abort: () => void;
}

export interface HttpHookOptions {
	errorHandler?: (error: Error) => void;
	waitForExecution?: boolean;
}

const useHttp = <T = unknown>(
	url: string,
	options?: HttpHookOptions & AxiosRequestConfig,
): UseHttpReturn<T | undefined> => {
	const { errorHandler, waitForExecution = false } = options || {};

	const data: Ref<T | undefined> = ref(undefined);
	const error: Ref<Error | undefined> = ref(undefined);
	const loading: Ref<boolean> = ref(false);

	let cancelTokenSource: CancelTokenSource | null = null;

	const execute = async (config?: AxiosRequestConfig) => {
		loading.value = true;
		cancelTokenSource = axios.CancelToken.source();
		try {
			const response = await request({
				url,
				...options,
				...config,
				cancelToken: cancelTokenSource.token,
			}).catch((err) => {
				if (axios.isCancel(err)) {
					throw new axios.CanceledError("请求被主动取消");
				}
				throw new Error(err);
			});
			const trueData = response as unknown as BaseResponseWrapper<
				T | undefined
			>;

			data.value =
				"data" in trueData ? (trueData.data as T) : (trueData as unknown as T);

			error.value = undefined;
			if (waitForExecution) {
				return trueData;
			}
		} catch (err) {
			if (err instanceof axios.CanceledError) {
				return {};
			}

			error.value = err as Error;
			if (typeof errorHandler === "function") {
				errorHandler(err as Error);
			}
		} finally {
			loading.value = false;
		}
	};

	const abort = () => {
		if (cancelTokenSource) {
			cancelTokenSource.cancel("请求被主动取消");
		}
	};

	const currentInstance = getCurrentInstance();

	if (currentInstance) {
		onUnmounted(() => {
			abort();
		});
	}

	if (!waitForExecution) {
		execute().catch((err: Error) => {
			ElMessage.error(err.message || "请求页面数据失败");
		});
	}

	return { data, error, loading, execute, abort } as UseHttpReturn<
		T | undefined
	>;
};

export default useHttp;
