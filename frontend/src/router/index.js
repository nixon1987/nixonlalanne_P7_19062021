import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Posts from "@/views/Posts.vue";
import createPost from "@/views/createPost.vue";

const routes = [
  {
    name: "login",
    path: "/",
    component: Login,
  },
  {
    name: "Posts",
    path: "/Posts",
    component: Posts,
    // props: true,
  },
  {
    name: "createPost",
    path: "/createPost",
    component: createPost,
    // props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
