
import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  // If user is not logged in or not an admin, redirect to login
  if (!isLoading && (!user || !isAdmin)) {
    return <Navigate to="/auth" />;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Site
          </Button>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
