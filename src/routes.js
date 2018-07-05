import Register from "./view/Register.vue";
import Download from "@/view/download";
import Countrylist from "@/view/Countrylist";

let routes = [
   /* {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },*/
  /* {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },*/
  //{ path: '/main', component: Main },
  {
    path: "/",
    component: Register,
    name: "Register"
  },

  {
    path: "/download",
    name: "download",
    component: Download
  },
   {
    path: "/Countrylist",
    name: "Countrylist",
    component: Countrylist
  }
];

export default routes;
