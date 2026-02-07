"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="flex justify-between border-b border-solid px-4 py-4 md:px-8">
      {/* ESQUERDA */}
      <div className="flex items-center gap-2 md:gap-10">
        <Image
          src="/logo.svg"
          width={120}
          height={27}
          alt="Finance AI PADevs"
          className="md:h-[39px] md:w-[173px]"
        />
        {/* LINKS DESKTOP - Esconder em mobile */}
        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={
              pathname === "/subscription"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Assinatura
          </Link>
        </div>
      </div>
      {/* DIREITA */}
      <div className="flex items-center gap-4">
        {/* MENU MOBILE - Mostrar apenas em mobile */}
        {isMounted && (
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="mt-8 flex flex-col gap-6">
                  <Link
                    href="/"
                    className={
                      pathname === "/"
                        ? "text-lg font-bold text-primary"
                        : "text-lg font-semibold text-muted-foreground"
                    }
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/transactions"
                    className={
                      pathname === "/transactions"
                        ? "text-lg font-bold text-primary"
                        : "text-lg font-semibold text-muted-foreground"
                    }
                  >
                    Transações
                  </Link>
                  <Link
                    href="/subscription"
                    className={
                      pathname === "/subscription"
                        ? "text-lg font-bold text-primary"
                        : "text-lg font-semibold text-muted-foreground"
                    }
                  >
                    Assinatura
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        )}
        <UserButton showName />
      </div>
    </nav>
  );
};

export default Navbar;
