"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ month, hasPremiumPlan }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    // Lógica para gerar o relatório IA
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-1.5 px-2 text-sm sm:h-10 sm:gap-2 sm:px-4"
        >
          Relatório IA
          <BotIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] gap-5 p-5 sm:w-[95vw] sm:max-w-[600px] sm:gap-6 sm:p-6 lg:max-w-[700px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader className="space-y-2.5 sm:space-y-3">
              <DialogTitle className="flex items-center gap-2.5 text-xl sm:text-2xl">
                <BotIcon className="h-6 w-6 text-primary" />
                Relatório IA
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed sm:text-base">
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>

            {!report && !reportIsLoading && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8 sm:space-y-5 sm:py-10">
                <div className="rounded-full bg-primary/10 p-5 sm:p-6">
                  <BotIcon className="h-12 w-12 text-primary" />
                </div>
                <p className="max-w-[280px] text-center text-sm leading-relaxed text-muted-foreground sm:max-w-none sm:text-base">
                  Clique no botão abaixo para gerar seu relatório personalizado
                  com IA
                </p>
              </div>
            )}

            {reportIsLoading && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8 sm:space-y-5 sm:py-10">
                <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
                <p className="text-center text-sm text-muted-foreground sm:text-base">
                  Gerando seu relatório...
                </p>
              </div>
            )}

            {report && !reportIsLoading && (
              <ScrollArea className="prose prose-sm max-h-[45vh] w-full pr-4 text-white sm:prose-base prose-headings:text-white prose-h3:text-base prose-h3:font-semibold prose-h4:text-sm prose-h4:font-medium prose-p:text-sm prose-p:leading-relaxed prose-strong:text-white prose-ul:text-sm sm:max-h-[400px] sm:prose-h3:text-lg sm:prose-h4:text-base sm:prose-p:text-base sm:prose-ul:text-base">
                <Markdown>{report}</Markdown>
              </ScrollArea>
            )}

            <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:gap-2">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="h-11 w-full text-base sm:h-10 sm:w-auto sm:text-sm"
                >
                  Fechar
                </Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
                className="h-11 w-full gap-2 text-base sm:h-10 sm:w-auto sm:text-sm"
              >
                {reportIsLoading ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <BotIcon className="h-4 w-4" />
                    {report ? "Gerar novamente" : "Gerar relatório"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="space-y-2.5 sm:space-y-3">
              <DialogTitle className="flex items-center gap-2.5 text-xl sm:text-2xl">
                <BotIcon className="h-6 w-6 text-primary" />
                Relatório IA
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed sm:text-base">
                Você precisa de um plano premium para gerar relatórios com IA.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-muted-foreground/25 py-8 sm:space-y-5 sm:py-10">
              <div className="rounded-full bg-muted p-5 sm:p-6">
                <BotIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2 px-4 text-center sm:px-0">
                <p className="text-sm font-medium sm:text-base">
                  Recurso Premium
                </p>
                <p className="text-sm text-muted-foreground">
                  Faça upgrade para acessar relatórios com IA
                </p>
              </div>
            </div>

            <DialogFooter className="flex-col-reverse gap-3 sm:flex-row sm:gap-2">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="h-11 w-full text-base sm:h-10 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                asChild
                className="h-11 w-full text-base sm:h-10 sm:w-auto sm:text-sm"
              >
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default AiReportButton;
