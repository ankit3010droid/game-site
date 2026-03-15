import { useState } from "react";
import { SplashScreen } from "./components/weme/SplashScreen";
import { OnboardingScreen } from "./components/weme/OnboardingScreen";
import { LoginScreen } from "./components/weme/LoginScreen";
import { HomeFeed } from "./components/weme/HomeFeed";
import { DiscoverScreen } from "./components/weme/DiscoverScreen";
import { TinderSwipeInterface } from "./components/weme/tinder/TinderSwipeInterface";
import { MatchesScreen } from "./components/weme/MatchesScreen";
import { ProfileScreen } from "./components/weme/ProfileScreen";
import { SettingsScreen } from "./components/weme/SettingsScreen";
import { WemeBottomNav } from "./components/weme/WemeBottomNav";
import { motion, AnimatePresence } from "motion/react";

type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "home"
  | "discover"
  | "swipe"
  | "matches"
  | "profile"
  | "settings";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("splash");

  const handleSplashComplete = () => {
    setCurrentScreen("onboarding");
  };

  const handleGetStarted = () => {
    setCurrentScreen("login");
  };

  const handleLogin = () => {
    setCurrentScreen("home");
  };

  const handleNavigate = (
    screen:
      | "home"
      | "discover"
      | "swipe"
      | "matches"
      | "profile",
  ) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onComplete={handleSplashComplete} />;
      case "onboarding":
        return (
          <OnboardingScreen onGetStarted={handleGetStarted} />
        );
      case "login":
        return <LoginScreen onLogin={handleLogin} />;
      case "home":
        return <HomeFeed />;
      case "discover":
        return <DiscoverScreen />;
      case "swipe":
        return <TinderSwipeInterface />;
      case "matches":
        return <MatchesScreen />;
      case "profile":
        return <ProfileScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <HomeFeed />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Screen Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full overflow-auto scrollbar-hide"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation - Hidden on splash, onboarding and login */}
      {currentScreen !== "splash" && currentScreen !== "onboarding" && currentScreen !== "login" && (
        <WemeBottomNav
          activeScreen={
            currentScreen as
              | "home"
              | "discover"
              | "swipe"
              | "matches"
              | "profile"
          }
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}