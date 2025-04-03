
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
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            Sign Out
          </Button>
        </>
      ) : (
        <NavLink to="/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </NavLink>
      )}
    </div>
  );
}
