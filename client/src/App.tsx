import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// TopPageは最初に表示されるので通常import
import TopPage from "./pages/TopPage";
// Homeは資料請求後メールURLからアクセスする詳細LP
const Home = lazy(() => import("./pages/Home"));

// ANSWERセクション専用ページ（メール案内用隠しページ）
const AnswerPage = lazy(() => import("./pages/AnswerPage"));
const AnswerComingSoon = lazy(() => import("./pages/AnswerComingSoon"));
const AnswerBeginner = lazy(() => import("./pages/AnswerBeginner"));
const AnswerElementary = lazy(() => import("./pages/AnswerElementary"));
const AnswerAdvanced = lazy(() => import("./pages/AnswerAdvanced"));

// それ以外はlazy loadで分割（初回表示に不要なコードを遅延読み込み）
const LevelPage = lazy(() => import("./pages/LevelPage"));
const ApplyPage = lazy(() => import("./pages/ApplyPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const SeminarBookingPage = lazy(() => import("./pages/SeminarBookingPage"));
const FpSeminarBookingPage = lazy(() => import("./pages/FpSeminarBookingPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ローディング中のフォールバック（最小限）
const PageLoader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#fff" }}>
    <div style={{ width: "32px", height: "32px", border: "3px solid #E5E7EB", borderTopColor: "#1B2A5E", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={TopPage} />
        <Route path="/lp" component={Home} />
        <Route path="/level/:level" component={LevelPage} />
        <Route path="/apply" component={ApplyPage} />
        <Route path="/booking" component={BookingPage} />
        <Route path="/seminar-booking" component={SeminarBookingPage} />
        <Route path="/fp-seminar-booking" component={FpSeminarBookingPage} />
        <Route path="/answer-intermediate" component={AnswerPage} />
        <Route path="/answer-coming-soon" component={AnswerComingSoon} />
        <Route path="/answer-beginner" component={AnswerBeginner} />
        <Route path="/answer-elementary" component={AnswerElementary} />
        <Route path="/answer-advanced" component={AnswerAdvanced} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
