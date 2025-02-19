import { useLocalStorage } from '@vueuse/core';
import type { MultiWatchSources } from '@vue/runtime-core';
import type { ComputedRef } from 'vue';
import type { AsyncFunction } from 'type-fest/source/async-return-type';
import type { ApiUrls } from '~/utils/api/index.dt';

type ResponseType = Record<string, string> | null | unknown

type ABody = Record<string, string> | null

type AFOptions = object | Record<string, string>

interface RSuccess {
  response?: ResponseType;
  isFirstLoading?: boolean;
}

interface AOptions {
  immediate?: boolean;
  cachingName?: string;
  onSuccess?: (arg: RSuccess) => RSuccess;
  triggerWatch?: MultiWatchSources;
}

interface ResponseApi {
  fetch: AsyncFunction;
  isLoading: Readonly<Ref<boolean>>;
  isFirstLoading: Readonly<Ref<boolean>>;
  data: ComputedRef<ResponseType>;
}

export function useApi(
  url: ApiUrls,
  body: ABody,
  options: AOptions,
  method: 'POST' | 'GET' = 'POST',
  apiOptions?: AFOptions,
  baseApiUrl?: string,
): ResponseApi {
  const token = useLocalStorage<string>('token', '');
  const isLoading = ref<boolean>(true);
  const isFirstLoading = ref<boolean>(true);
  const response = ref<ResponseType>(null);
  const runtimeConfig = useRuntimeConfig();
  baseApiUrl = runtimeConfig.app.baseUrl;

  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  };

  const fetchUrl = handlerUrl(baseApiUrl + url, method, body);
  const fetchOptions = {
    method,
    ...defaultOptions,
    ...apiOptions,
    lazy: true,
    server: false,
  };

  let caching: any;
  if (options.cachingName) {
    caching = handlerHashing(options.cachingName);
    response.value = caching.get();

    if (response.value) return {
      fetch: async (params = body) => await handlerFetch(fetchUrl, params, fetchOptions),
      isLoading: readonly(isLoading),
      isFirstLoading: readonly(isFirstLoading),
      data: computed(() => response.value),
    };

  }

  if (options.immediate) handlerFetch(fetchUrl, body, fetchOptions);

  if (options.triggerWatch) watch(options.triggerWatch, async () => await handlerFetch(fetchUrl, body, fetchOptions));

  async function handlerFetch(urlFetch: string, bodyFetch: ABody, optionsFetchApi: AFOptions) {
    isLoading.value = true;

    response.value = await $fetch(urlFetch, {
      body: method !== 'GET' ? {
        ...bodyFetch,
      } : undefined,
      ...optionsFetchApi,
    }).catch(handlerErrorFetch);

    options.onSuccess && options.onSuccess({
      response: response.value,
      isFirstLoading: isFirstLoading.value,
    });

    if (caching && response.value) caching.set(response.value);

    isLoading.value = false;
    isFirstLoading.value = false;
  }

  return {
    fetch: async (params = body) => await handlerFetch(fetchUrl, params, fetchOptions),
    isLoading: readonly(isLoading),
    isFirstLoading: readonly(isFirstLoading),
    data: computed(() => response.value),
  };
}

function handlerErrorFetch(error: Error) {
  console.error(error);
}

function handlerHashing(name: string) {
  const hashData = useLocalStorage<string>(name, 'null');

  return {
    set: (response: ResponseType) => {
      hashData.value = JSON.stringify(response);
    },
    get: () => {
      const data = JSON.parse(hashData.value);
      return data !== 'null' ? data : undefined;
    },
  }
    ;
}

function handlerUrl(url: string, method: string, body: ABody) {
  if (method === 'GET') {
    Object.entries(body || {}).forEach(([key, val], index) => {
      if (key) {
        url += !index ? `?${key}=${val}` : `&${key}=${val}`;
      }
    });
  }
  return url;
}


