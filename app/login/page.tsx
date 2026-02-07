import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-4 sm:p-8">
        <Image
          src="/logo.svg"
          alt="Finance AI PADevs"
          width={120}
          height={27}
          className="mb-8 sm:h-[39px] sm:w-[173px]"
        />
        <h1 className="mb-3 text-2xl font-bold sm:text-4xl">Bem-vindo</h1>
        <p className="mb-8 text-sm text-muted-foreground sm:text-base">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, oferecer insights personalizados,
          facilitando o controle de orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/* DIREITA */}
      <div className="relative hidden h-full w-full lg:block">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
