"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";

import Input from "@/components/forms/Input";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/wrappers/Container";
import Button from "@/components/buttons/Button";
import Brand from "@/components/navigation/Brand";

const schema = object().shape({
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});

export default function AdminLoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
        router.push("/admin");
      } else {
        console.log(error);
        alert("Authentication failed!");
      }
    });
  }

  return (
    <Container className="max-w-2xl min-h-screen grid place-items-center">
      <div className="w-full space-y-8 ">
        <Brand sponsor="Multiverse" className="mx-auto scale-150" />
        <PageTitle title="Login as Admin" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            register={{
              ...register("email"),
            }}
            error={errors.email}
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            type="password"
            register={{
              ...register("password"),
            }}
            error={errors.password}
            label="Password"
            placeholder="Enter your password"
          />

          <Button variant="dynamic" className="px-10">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}
