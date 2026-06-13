import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const accounts = [
  {
    id: "1",
    availableBalance: 1000,
    currentBalance: 1000,
    officialName: "officialName",
    mask: "mask",
    institutionId: "institutionId",
    name: "name",
    type: "type",
    subtype: "subtype",
    appwriteItemId: "appwriteItemId",
    sharableId: "sharableId",
  },
];
const App = () => {
  const isLogged = { username: "Saurabh" };
  return (
    <section className="home">
      <div className="home-content ml-3">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={isLogged ? isLogged.username : "Guest"}
            subtext="Access & manage your accounts and transactions efficiently"
          />
        </header>
        <TotalBalanceBox
          accounts={accounts}
          totalBanks={3}
          totalCurrentBalance={1013456.13}
        />
      </div>
    </section>
  );
};

export default App;
