
import { useState } from '#imports'
export default defineNuxtRouteMiddleware((to, from) => {
    const user = useState('user')
    if (from.path !== 'profile/' && !user.value) {
        return navigateTo('/')
    }
});