const user = useState('password')
export default defineNuxtRouteMiddleware((to, from) => {
    if (from.path !== 'profile/' && user.value !== '@admin') {
        return navigateTo('/')
    }
});