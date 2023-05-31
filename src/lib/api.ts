import fetcher from "./fetcher";

interface LoginForm {
  username: string;
  password: string;
}
interface SignupReqBody {
  email: string;
  name: string;
  password: string;
}

const auth = {
  token: (form: FormData) =>
    fetcher
      .post<FormData, { data: { token_type: string; access_token: string } }>("/auth/token", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch(console.log),
};

const user = {
  signup: (data: SignupReqBody) => fetcher.post("/user/signup", data),
};

export { auth, user };
