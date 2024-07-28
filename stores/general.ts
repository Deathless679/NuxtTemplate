import {defineStore} from "pinia";

export const useGeneralStore = defineStore('general', {
    state: () => (<{
        isLoading: boolean
    }>{
        isLoading: false,
    }),
    actions: {
        setLoading(flag: boolean) :void {
            this.isLoading = flag
        }
    }
})