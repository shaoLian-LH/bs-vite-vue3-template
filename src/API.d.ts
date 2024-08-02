declare namespace API {
	interface PageOptions {
		page: number,
		size: number
	}

	interface Response<T> {
		data: T,
		msg: string,
		success: boolean
	}
}
