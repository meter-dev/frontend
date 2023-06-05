import fetcher from "./fetcher";

/**
 * GET REQUESTS WONT BE HANDLED HERE
 * USING `const { data} = useSWR("/route", fetcher)` IN HOOK INSTEAD
 */

interface SignupReqBody {
  email: string;
  name: string;
  password: string;
}

interface CreateRuleReqBody {
  name: string;
  position: string;
  resource: string;
  operator: string;
  value: number;
}

const auth = {
  token: (form: FormData) =>
    fetcher.post<{ token_type: string; access_token: string }>("/auth/token", form, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

const user = {
  signup: (data: SignupReqBody) => fetcher.post("/user/signup", data),
};

const rule = {
  create: (data: CreateRuleReqBody) => fetcher.post("/rule/", data),
  update: (id: number, data: CreateRuleReqBody) => fetcher.patch(`/rule/${id}`, data),
  delete: (id: number) => fetcher.delete(`/rule/${id}`),
  enable: (id: number) => fetcher.put(`/rule/${id}/enable`),
  disable: (id: number) => fetcher.put(`/rule/${id}/disable`),
};

export { auth, user, rule };
