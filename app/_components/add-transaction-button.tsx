"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-9 gap-1.5 rounded-full px-3 text-xs font-bold sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              <span className="hidden sm:inline">Adicionar Transação</span>
              <span className="sm:hidden">Adicionar</span>
              <ArrowDownUpIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações. Atualize seu plano para criar transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
