import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { InputBar } from "./components/input-bar";
import { Clock } from "./components/clock";
import { IconPin, Pin } from "./components/icon-pin";
import { Background } from "./components/background";
import { SettingsDrawer } from "./components/settings-drawer";
import { SettingsProvider } from "./providers/SettingsProvider";
import pins from "./config/pins";
import { SlidersIcon } from "./components/icons";
import "./styles/index.css";
import { twMerge } from "tailwind-merge";

const Index = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Background />
      <SettingsDrawer
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <main id="app">
        <Pin
          className={twMerge(
            "fixed top-4 right-4 w-12 h-12",
            settingsOpen
              ? "opacity-0 pointer-events-none"
              : "opacity-20 hover:opacity-100"
          )}
          onClick={() => {
            setSettingsOpen((prev) => !prev);
          }}
        >
          <SlidersIcon className="w-5 h-5" />
        </Pin>
        <Clock />
        <div className="pb-[64px]" />
        <InputBar />
        <section className="flex w-full align-middle h-12 mt-2 justify-between">
          <section className="flex gap-2 w-full">
            {pins.map((pin, index) => (
              <IconPin
                key={pin.type + "-" + index}
                type={pin.type}
                url={pin.url}
              />
            ))}
          </section>
        </section>
        <div className="pb-[128px]" />
      </main>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <Index />
    </SettingsProvider>
  </StrictMode>
);