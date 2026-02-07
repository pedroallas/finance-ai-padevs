import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPES_OPTIONS,
} from "../_constants/transactions";
import { DatePicker } from "./ui/date-picker";
import { z } from "zod";
import {
  TransactionType,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertTransaction } from "../_actions/upsert-transaction";

interface UpsertTransactionDialogProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  transactionId?: string;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z
    .number({
      message: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  type: z.enum(TransactionType, {
    // corrected line / antes era z.nativeEnum
    message: "O tipo é obrigatório.", // corrected line / antes era required_error
  }),
  category: z.enum(TransactionCategory, {
    // corrected line / antes era z.nativeEnum
    message: "A categoria é obrigatória.", // corrected line / antes era required_error
  }),
  paymentMethod: z.enum(TransactionPaymentMethod, {
    // corrected line / antes era z.nativeEnum
    message: "O método de pagamento é obrigatório.", // corrected line / antes era required_error
  }),
  date: z.date({
    message: "A data é obrigatória.", // corrected line / antes era required_error
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertTransactionDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  setIsOpen,
}: UpsertTransactionDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      // amount: 0, // alterado para evitar conflito com o MoneyInput
      category: TransactionCategory.OTHER,
      date: new Date(),
      name: "",
      paymentMethod: TransactionPaymentMethod.CASH,
      type: TransactionType.EXPENSE,
    },
  });
  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertTransaction({ ...data, id: transactionId });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isUpdate = Boolean(transactionId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      {/* <DialogTrigger className="asChild"></DialogTrigger> */}
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] gap-4 overflow-y-auto p-4 sm:w-[95vw] sm:max-w-[500px] sm:gap-6 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl">
            {isUpdate ? "Atualizar" : "Criar"} transação
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Insira as informações abaixo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome..."
                      className="h-10 text-sm sm:h-11 sm:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      {...field}
                      className="h-10 text-sm sm:h-11 sm:text-base"
                    >
                      <SelectValue placeholder="Selecione o tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_TYPES_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-sm sm:text-base"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Categoria
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      {...field}
                      className="h-10 text-sm sm:h-11 sm:text-base"
                    >
                      <SelectValue placeholder="Selecione uma categoria..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-sm sm:text-base"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Método de pagamento
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      {...field}
                      className="h-10 text-sm sm:h-11 sm:text-base"
                    >
                      <SelectValue placeholder="Selecione um método de pagamento..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-sm sm:text-base"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full text-sm sm:h-10 sm:w-auto sm:text-base"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="h-10 w-full text-sm sm:h-10 sm:w-auto sm:text-base"
              >
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTransactionDialog;
