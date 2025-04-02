  interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
  }
  interface SignInParams {
    email: string;
    idToken: string;
  }
  interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
    secretCode: string;
  }
  
  type FormType = "signin" | "signup";
  