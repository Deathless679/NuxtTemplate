const defaultOptions = {
    method: 'get'
}
const store = useGeneralStore();
const baseUrl = 'https://your_url/api'

export default async function useApiFetch(url, options, defaultUrl = baseUrl) {

    store.setLoading(true);

    const { data, refresh } = await useFetch(`${defaultUrl}${url}`, {
        ...defaultOptions,
        ...options
    });

    store.setLoading(false);

    return { data: data.value, refresh }
}
