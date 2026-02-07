import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteTransaction } from "../_actions/delete-transaction";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTransaction({ transactionId });
      toast.success("Transação deletada com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao deletar a transação.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] gap-4 p-4 sm:w-[95vw] sm:max-w-[500px] sm:gap-6 sm:p-6">
        <AlertDialogHeader className="space-y-2 sm:space-y-3">
          <AlertDialogTitle className="text-lg sm:text-xl">
            Você deseja realmente deletar essa transação?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base">
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-2">
          <AlertDialogCancel className="mt-0 h-10 w-full text-sm sm:h-10 sm:w-auto sm:text-base">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDeleteClick}
            className="h-10 w-full text-sm sm:h-10 sm:w-auto sm:text-base"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionButton;
