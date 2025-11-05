import { Request, Response } from "express";
import { signup } from "./auth.service";
import { SignupDto } from "./auth.types";
import signupSchema from "./auth.schema";
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

export { signupForm };
