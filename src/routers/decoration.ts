import type { Router } from 'vue-router'

export const patchBeforeEach = (router: Router) => {
	router.beforeEach(async (to, _from, next) => {
		const canSkipAuthCheck = to.meta.skipAuthCheck
		if (canSkipAuthCheck) {
			next();
		} else {
			// 处理鉴权
		}
	});
}


