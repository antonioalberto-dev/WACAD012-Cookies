import { Request, Response } from "express";
import { signup, login } from "./auth.service";
import { SignupDto, LoginDto } from "./auth.types";
import signupSchema, { loginSchema } from "./auth.schema";
import validador from "../../utils/validador";

const signupForm = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("auth/signup");
  } else {
    try {
      const errors = validador(signupSchema, req.body);

      if (Object.keys(errors).length > 0) {
        return res.render("auth/signup", {
          formData: req.body,
          errors
        });
      }

      const signupData: SignupDto = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
      };

      await signup(signupData);

      res.redirect("/");
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      
      const errorMessage = error.message === "Email já cadastrado" 
        ? error.message 
        : "Erro ao criar conta. Tente novamente.";

      return res.render("auth/signup", {
        formData: req.body,
        errors: {
          email: errorMessage
        }
      });
    }
  }
};

const loginForm = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    return res.render("auth/login");
  } else {
    try {
      const errors = validador(loginSchema, req.body);

      if (Object.keys(errors).length > 0) {
        return res.render("auth/login", {
          formData: req.body,
          errors
        });
      }

      const loginData: LoginDto = {
        email: req.body.email,
        password: req.body.password
      };

      const user = await login(loginData);

      req.session.userId = user.id;
      req.session.userType = user.userType.label;

      res.redirect("/");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      
      const errorMessage = error.message === "Email ou senha inválidos" 
        ? error.message 
        : "Erro ao fazer login. Tente novamente.";

      return res.render("auth/login", {
        formData: req.body,
        errors: {
          email: errorMessage
        }
      });
    }
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao fazer logout:", err);
      return res.redirect("/");
    }
    res.clearCookie('connect.sid');
    res.redirect("/login");
  });
};

export { signupForm, loginForm, logout };
