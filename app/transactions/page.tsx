import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-4 p-4 md:space-y-6 md:p-6">
        {/* TÍTULO E BOTÃO*/}
        <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="text-xl font-bold md:text-2xl">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <div className="flex-1 overflow-auto">
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
