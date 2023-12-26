import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import User from "../components/User.vue";
import Upload from "../components/Upload.vue";
import Settings from "../components/Settings.vue";
import NotFound from "../components/NotFound.vue";
import About from "../components/productPage/About.vue";
import Pricing from "../components/productPage/Pricing.vue";
import Contact from "../components/productPage/Contact.vue";
import PersonalDrive from "../components/productPage/PersonalDrive.vue";

const routes = [
  {
    path: "/",
    name: "Drive",
    component: PersonalDrive,
  },
  {
    path: "/pd",
    name: "Personal Drive",
    component: PersonalDrive,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: Pricing,
  },
  {
    path: "/contact",
    name: "Contact Us",
    component: Contact,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user",
    name: "Home",
    component: User,
  },
  {
    path: "/user/upload/",
    name: "Upload Files",
    component: Upload,
  },
  {
    path: "/user/settings",
    name: "Settings",
    component: Settings,
  },

  { path: "/:notFound(.*)", component: NotFound },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (
    to.path === "/login" ||
    to.path === "/pd" ||
    to.path === "/about" ||
    to.path === "/pricing" ||
    to.path === "/contact" ||
    to.path === "/" ||
    to.path === "/signup"
  ) {
    document.title = to.name;
    next();
  }
  if (!sessionStorage.getItem("isLoggedIn")) {
    document.title = to.name;
    next({ path: "/login" });
  } else {
    document.title = to.name;
    next();
  }
});

export default router;
