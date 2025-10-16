import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Vault from "./pages/Vault";
import Tasks from "./pages/Tasks";
import Messages from "./pages/Messages";
import Review from "./pages/Review";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/contacts" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Contacts />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/vault" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Vault />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/tasks" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Tasks />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/messages" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Messages />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/review" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Review />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
