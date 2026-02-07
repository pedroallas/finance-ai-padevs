import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const HomePage = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0"); // ✅ Garante que o mês tenha dois dígitos (ex: "01" para janeiro)
    redirect(`?month=${currentMonth}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-4 overflow-auto p-4 md:space-y-6 md:p-6 lg:overflow-hidden">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-0">
          <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
          <div className="flex items-center gap-2 sm:gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:h-full lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <div className="flex flex-col gap-4 md:gap-6 lg:overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 md:gap-6 lg:h-full lg:grid-cols-3 lg:overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
