
import React from "react";
import Menu from "../../component/menu";
import Header from "./Header";
import SpendCard from "./SpendCard";
import ChartActivity from "./ChartActivity";
import TransactionOverview from "./TransactionOverview";
import FlightsShare from "./FlightsShare";

function Dashboard() {
  return (
    <main className="flex overflow-hidden bg-zinc-100">
      <Menu className="flex flex-col items-center gap-4 px-2 sm:py-5 shrink-0 w-64 h-full bg-white shadow-lg max-md:w-20"/>
      
      <div className="flex flex-col grow shrink-0 self-start mt-5 basis-0 w-full max-md:max-w-full p-6 max-md:p-4 ml-10 sm:ml-12 overflow-y-auto">
        <Header />
        <section className="flex gap-5 overflow-hidden px-9 py-8 mt-8 w-full bg-white rounded-2xl max-w-[1021px] shadow-[0px_4px_6px_rgba(62,73,84,0.04)] max-md:px-5 max-md:flex-col max-md:max-w-full">
          <SpendCard
            title="Spends Today"
            amount="$5,245"
            bgColor="bg-blue-600"
          />
          <SpendCard
            title="Spends Yesterday"
            amount="$953.55"
            bgColor="bg-green-500"
          />
        </section>
        <ChartActivity />
        <section className="self-center mt-16 ml-3.5 w-full max-w-[1074px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <TransactionOverview />
            <FlightsShare />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
