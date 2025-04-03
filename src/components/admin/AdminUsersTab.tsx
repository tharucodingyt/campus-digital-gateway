
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, UserPlus, UserX, Shield, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_admin: boolean;
}

const AdminUsersTab = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
    is_admin: false,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false);

  // Fetch users from Supabase
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // First, get all auth users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw authError;
      }

      if (!authUsers || !authUsers.users) {
        setUsers([]);
        return;
      }

      // Get admin users to check which users are admins
      const { data: adminUsers, error: adminError } = await supabase
        .from("admin_users")
        .select("id");

      if (adminError) {
        throw adminError;
      }

      // Create admin IDs set for quick lookup
      const adminIds = new Set(adminUsers?.map(admin => admin.id) || []);

      // Map auth users to our User interface
      const mappedUsers = authUsers.users.map(user => ({
        id: user.id,
        email: user.email || "",
        created_at: new Date(user.created_at || "").toLocaleDateString(),
        last_sign_in_at: user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : null,
        is_admin: adminIds.has(user.id),
      }));

      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error fetching users",
        description: "There was an error loading users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      // Create a new user with Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserData.email,
        password: newUserData.password,
        email_confirm: true
      });

      if (error) throw error;

      if (newUserData.is_admin && data.user) {
        // If the new user should be an admin, add them to the admin_users table
        const { error: adminError } = await supabase
          .from("admin_users")
          .insert({ id: data.user.id });

        if (adminError) throw adminError;
      }

      // Refresh the user list
      await fetchUsers();

      setIsAddUserOpen(false);
      setNewUserData({
        email: "",
        password: "",
        is_admin: false,
      });

      toast({
        title: "User created",
        description: "The user has been successfully created",
      });
    } catch (error: any) {
      toast({
        title: "Error creating user",
        description: error.message || "There was an error creating the user",
        variant: "destructive",
      });
    }
  };

  const handlePromoteUser = async () => {
    if (!selectedUser) return;

    try {
      // Add the user to the admin_users table
      const { error } = await supabase
        .from("admin_users")
        .insert({ id: selectedUser.id });

      if (error) throw error;

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, is_admin: true } : user
        )
      );

      toast({
        title: "User promoted",
        description: `${selectedUser.email} has been promoted to an admin.`,
      });

      setIsPromoteDialogOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast({
        title: "Error promoting user",
        description: error.message || "There was an error promoting the user",
        variant: "destructive",
      });
    }
  };

  const handleRemoveAdmin = async (user: User) => {
    try {
      // Remove the user from the admin_users table
      const { error } = await supabase
        .from("admin_users")
        .delete()
        .match({ id: user.id });

      if (error) throw error;

      // Update local state
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, is_admin: false } : u
        )
      );

      toast({
        title: "Admin rights removed",
        description: `Admin rights have been removed from ${user.email}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error removing admin rights",
        description: error.message || "There was an error removing admin rights",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      // Delete the user from Supabase Auth
      const { error } = await supabase.auth.admin.deleteUser(selectedUser.id);

      if (error) throw error;

      // Remove from local state
      setUsers(users.filter((user) => user.id !== selectedUser.id));

      toast({
        title: "User deleted",
        description: `${selectedUser.email} has been deleted.`,
      });

      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast({
        title: "Error deleting user",
        description: error.message || "There was an error deleting the user",
        variant: "destructive",
      });
    }
  };

  const handleSendPasswordReset = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: `A password reset email has been sent to ${email}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error sending password reset",
        description: error.message || "There was an error sending the password reset email",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(
    (user) => user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading users...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Sign In</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No users found. Create new users using the "Add User" button.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        {user.is_admin ? (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                            Admin
                          </Badge>
                        ) : (
                          <Badge variant="outline">User</Badge>
                        )}
                      </TableCell>
                      <TableCell>{user.created_at}</TableCell>
                      <TableCell>{user.last_sign_in_at || "Never"}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSendPasswordReset(user.email)}
                          title="Send password reset email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        {user.is_admin ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAdmin(user)}
                            title="Remove admin rights"
                          >
                            <Shield className="h-4 w-4 text-red-500" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsPromoteDialogOpen(true);
                            }}
                            title="Promote to admin"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                          title="Delete user"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. You can optionally make them an admin.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, email: e.target.value })
                }
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={newUserData.password}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, password: e.target.value })
                }
                placeholder="Create a password"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAdmin"
                checked={newUserData.is_admin}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, is_admin: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <label htmlFor="isAdmin" className="text-sm font-medium">
                Make this user an administrator
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              You are about to delete <strong>{selectedUser?.email}</strong>.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Promote User Confirmation Dialog */}
      <Dialog open={isPromoteDialogOpen} onOpenChange={setIsPromoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote to Admin</DialogTitle>
            <DialogDescription>
              Are you sure you want to promote this user to administrator? Administrators have full access to the admin panel.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              You are about to give admin privileges to <strong>{selectedUser?.email}</strong>.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePromoteUser}>
              Promote to Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersTab;
