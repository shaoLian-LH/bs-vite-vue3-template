import type { RouteRecordRaw } from "vue-router";

export const configs: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "/",
		redirect: "/dashboard",
		meta: {
			skipAuthCheck: true,
		}
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import("@/pages/DashBoard.vue"),
		meta: {
			title: "首页",
			skipAuthCheck: true,
		},
	},
	{
		path: "/redirect-to-out-site",
		name: "redirect-to-out-site",
		component: () => import("@/pages/Framework/RedirectOutSite.vue"),
		meta: {
			skipAuthCheck: true,
			title: "即将跳转到外部站点",
		},
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/pages/Framework/NotFound.vue"),
		meta: {
			skipAuthCheck: true,
		}
	},
	// 保底路由
	{
		path: "/:pathMatch(.*)",
		redirect: "/404"
	},
];
