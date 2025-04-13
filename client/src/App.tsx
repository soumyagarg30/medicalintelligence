import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ChatbotPage from "@/pages/ChatbotPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ChatbotPage} />
      <Route path="/full" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
