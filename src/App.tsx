import React, { useState } from "react";
import Top from "./components/Top";
import History from "./components/History";
import Flow from "./components/Flow";

const App: React.FC = () => {
  const [screen, setScreen] = useState<"top" | "history" | "flow">("top");

  const renderScreen = () => {
    switch (screen) {
      case "top":
        return <Top onNavigate={setScreen} />;
      case "history":
        return <History onNavigate={setScreen} />;
      case "flow":
        return <Flow onNavigate={setScreen} />;
      default:
        return <Top onNavigate={setScreen} />;
    }
  };

  return <div className="min-h-screen flex items-start justify-center p-6">{renderScreen()}</div>;
};

export default App;
