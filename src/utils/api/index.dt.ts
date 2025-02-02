import * as types from '@/utils/api';


const apiUrls = [...Object.keys(types)] as const;
export type ApiUrls = typeof apiUrls[number];

