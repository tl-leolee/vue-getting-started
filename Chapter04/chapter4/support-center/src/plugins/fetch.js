let baseUrl

export default {
    install(Vue, options) {
        console.log('Installed', options)
        baseUrl = options.baseUrl
        
        Vue.prototype.$fetch = $fetch
    }
}

export async function $fetch(url) {
    const res = await fetch(`${baseUrl}${url}`)
    if (res.ok) {
        const data = await res.json()
        return data
    } else {
        const error = new Error(`fetch error for url: ${baseUrl}${url}`)
        return error
    }
}