// @ts-nocheck
import { useLocalStorage } from '@vueuse/core';

const baseUrl: string = '';

type Options = {
  immediate?: boolean
  onSuccess?: any
  triggerWatch?: Ref<any>
}

export function useApi(
  url: string,
  body: Record<any, any>,
  options: Options = {
    immediate: undefined,
    onSuccess: undefined,
    triggerWatch: undefined,
  },
  method: 'POST' | 'GET' = 'POST',
  apiOptions: {},
  baseApiUrl: string = baseUrl,
) {
  const token = useLocalStorage<string>('token', '');
  const isLoading = ref<boolean>(true);
  const isFirstLoading = ref<boolean>(true);
  const response = ref<any>([]);

  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  };

  const fetchUrl = baseApiUrl + url;
  const fetchOptions = {
    method,
    ...defaultOptions,
    ...apiOptions,
    lazy: true,
    server: false,
  };

  if (options.immediate) {
    handlerFetch(fetchUrl, body, fetchOptions);
  }

  if (options.triggerWatch) {
    watch(options.triggerWatch, async () => await handlerFetch(fetchUrl, body, fetchOptions));
  }


  async function handlerFetch(urlFetch: string, bodyFetch: any, optionsFetchApi: Record<any, any>) {
    try {
      isLoading.value = true;
      response.value = await $fetch(urlFetch, {
        body: {
          ...bodyFetch,
        },
        ...optionsFetchApi,
      });
      options.onSuccess && options.onSuccess({
        response: response.value,
        isFirstLoading: isFirstLoading.value,
      });
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
      isFirstLoading.value = false;
    }
  }


  return {
    fetch: async (params = body) => await handlerFetch(fetchUrl, params, fetchOptions),
    isLoading: readonly(isLoading),
    isFirstLoading: readonly(isFirstLoading),
    data: computed(() => response.value),
  };
}


