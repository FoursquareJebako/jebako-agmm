const user = useState('password')
export default defineNuxtRouteMiddleware((to, from) => {
    if (user.value !== '@admin') {
        return navigateTo('/')
    }
});