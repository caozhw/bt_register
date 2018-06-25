import Register from "./view/Register.vue";
import Download from "@/view/download";

let routes = [
  /* {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },*/
  {
    path: "/",
    component: Register,
    name: "注册"
  },
  /* {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },*/
  //{ path: '/main', component: Main },
  {
    path: "/download",
    name: "download",
    component: Download
  }
];

export default routes;
