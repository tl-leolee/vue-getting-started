export default function (resource) {
    return {
        data() {
            let initData = {
                remoteDataLoading: 0,
                remoteErrors: {}
            }
            
            for (const key in resource) {
                initData[key] = null
                initData.remoteErrors[key] = null
            }

            return initData;
        },
        methods: {
            async fetchResource(key, url) {
                this.$data.remoteDataLoading++
                this.$data.remoteErrors[key] = null
                try {
                    this.$data[key] = await this.$fetch(url)
                } catch (e) {
                    console.log(e)
                    initData.remoteErrors[key] = e
                }
                this.$data.remoteDataLoading--
            }
        },
        computed: {
            remoteDataBusy() {
                return this.$data.remoteDataLoading !== 0
            },
            hasRemoteErrors () {
                return Object.keys(this.$ddata.remoteErrors).some(key => {
                    this.$data.remoteErrors[key]
                })
            }
        },
        created() {
            for (const key in resource) {
                let url = resource[key]
                this.fetchResource(key, url)
            }
        }
    }
}