import axios from "axios";
import authService from "@/api/auth";
import { config } from "@/config";
import camelcaseKeys from "camelcase-keys";
import { toast } from "sonner";
import { useNoteStore } from "@/stores/useNoteStore";

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(async (config) => {
  const user = await authService.getUser();
  if (user && !user.expired) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    const { data } = response;
    return { ...response, data: camelcaseKeys(data) };
  },
    error => {
    if (!error.response) {
      toast.error('网络异常，请检查您的连接');
    } else {
      const status = error.response.status;
      switch (status) {
        case 401:
          const {isDirty} = useNoteStore();
          if(isDirty) {
            toast.warning('您有未保存的更改，保存后再重新登录');
          } else {
            authService.login();
          }
          break;
        case 403:
          toast.warning('没有访问权限');
          break;
        case 500:
          toast.error('服务器异常，请稍后重试');
          break;
        default:
          toast.error(`请求错误 (${status})`);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
