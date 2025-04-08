
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function NavbarAuth() {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          {isAdmin && (
            <NavLink to="/admin">
              <Button variant="ghost" size="sm">
                Admin
              </Button>
            </NavLink>
          )}
          <NavLink to="/profile">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </NavLink>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button variant="outline" size="sm" onClick={() => window.location.href = "/auth"}>
          Sign In
        </Button>
      )}
    </div>
  );
}
