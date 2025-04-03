
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

// Mock data for users - in production, this would come from your Supabase database
const initialUsers = [
  {
    id: "1",
    email: "admin@school.edu",
    full_name: "Admin User",
    created_at: "2025-01-15",
    last_sign_in: "2025-04-01",
    is_admin: true,
    is_verified: true,
  },
  {
    id: "2",
    email: "teacher1@school.edu",
    full_name: "John Smith",
    created_at: "2025-01-20",
    last_sign_in: "2025-03-28",
    is_admin: false,
    is_verified: true,
  },
  {
    id: "3",
    email: "teacher2@school.edu",
    full_name: "Emily Johnson",
    created_at: "2025-02-05",
    last_sign_in: "2025-03-30",
    is_admin: false,
    is_verified: true,
  },
  {
    id: "4",
    email: "pending@school.edu",
    full_name: "Pending User",
    created_at: "2025-03-25",
    last_sign_in: null,
    is_admin: false,
    is_verified: false,
  },
];

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  last_sign_in: string | null;
  is_admin: boolean;
  is_verified: boolean;
}

const AdminUsersTab = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    email: "",
    full_name: "",
    password: "",
    is_admin: false,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false);

  // In a real implementation, you would fetch users from your Supabase database
  useEffect(() => {
    // This is where you would normally fetch users from Supabase
    // For now, we're using the mock data
  }, []);

  const handleAddUser = async () => {
    try {
      // In a real implementation, you would use Supabase to create a user
      // For now, we'll just simulate it
      const newUser: User = {
        id: Date.now().toString(),
        email: newUserData.email,
        full_name: newUserData.full_name,
        created_at: new Date().toISOString().split('T')[0],
        last_sign_in: null,
        is_admin: newUserData.is_admin,
        is_verified: false,
      };

      setUsers([...users, newUser]);
      setIsAddUserOpen(false);
      setNewUserData({
        email: "",
        full_name: "",
        password: "",
        is_admin: false,
      });

      toast({
        title: "User created",
        description: "The user has been successfully created",
      });
    } catch (error) {
      toast({
        title: "Error creating user",
        description: "There was an error creating the user",
        variant: "destructive",
      });
    }
  };

  const handlePromoteUser = () => {
    if (!selectedUser) return;

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...user, is_admin: true } : user
      )
    );

    toast({
      title: "User promoted",
      description: `${selectedUser.full_name || selectedUser.email} has been promoted to an admin.`,
    });

    setIsPromoteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsers(users.filter((user) => user.id !== selectedUser.id));

    toast({
      title: "User deleted",
      description: `${selectedUser.full_name || selectedUser.email} has been deleted.`,
    });

    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSendPasswordReset = (email: string) => {
    // In a real implementation, you would use Supabase to send a password reset email
    // For now, we'll just show a toast notification
    toast({
      title: "Password reset email sent",
      description: `A password reset email has been sent to ${email}.`,
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name/Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Sign In</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.full_name || "—"}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    {user.is_verified ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    )}
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
                  <TableCell>{user.last_sign_in || "Never"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSendPasswordReset(user.email)}
                      title="Send password reset email"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    {!user.is_admin && (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. The user will receive an email with instructions to set up their password.
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
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                value={newUserData.full_name}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, full_name: e.target.value })
                }
                placeholder="John Doe"
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
                placeholder="Temporary password"
              />
              <p className="text-xs text-gray-500">
                The user can change their password after logging in.
              </p>
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
