import state from '../state'
import router from '../router'

let baseUrl

export default {
    install(Vue, options) {
        console.log('Installed', options)
        baseUrl = options.baseUrl
        
        Vue.prototype.$fetch = $fetch
    }
}

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options)

    const res = await fetch(`${baseUrl}${url}`, finalOptions)
    if (res.ok) {
        const data = await res.json()
        return data
    } else if (res.status == 403) {
        state.user = null
        if (router.currentRoute.matched.some(r => r.meta.private)) {
            router.replace({ name: 'login', params: {
                wantedRoute: router.currentRoute.fullPath,
            }})
        }
    } else {
        const message = await res.text()
        const error = new Error(message)
        error.response = res
        throw error
    }
}