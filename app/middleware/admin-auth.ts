import { useState } from "#imports";
export default defineNuxtRouteMiddleware((to, from) => {
  const user: any = useState("user");
  console.log("User in admin-auth middleware:", user.value);
  if (user.value?.name !== "@Admin") {
    return navigateTo("/");
  }
});
