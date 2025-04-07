
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Check, Mail, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  responded: boolean;
  created_at: string;
}

const AdminContactMessagesTab = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data || []);
    } catch (error: any) {
      console.error("Error loading messages:", error);
      toast({
        title: "Error",
        description: "Failed to load contact messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: true } : msg
      ));

      toast({
        title: "Message marked as read",
        description: "The contact message has been marked as read",
      });
    } catch (error: any) {
      console.error("Error marking message as read:", error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const toggleResponded = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ responded: !current })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, responded: !current } : msg
      ));

      toast({
        title: current ? "Marked as not responded" : "Marked as responded",
        description: `The message has been marked as ${current ? "not responded" : "responded"}`,
      });
    } catch (error: any) {
      console.error("Error toggling responded status:", error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setOpenDialog(true);
    
    // If message is not read, mark it as read
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>
            View and manage messages from the contact form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No messages received yet.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 border rounded-lg ${message.is_read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{message.subject}</h3>
                      <p className="text-sm text-gray-600">From: {message.name} ({message.email})</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant={message.is_read ? "outline" : "default"}>
                        {message.is_read ? "Read" : "New"}
                      </Badge>
                      <Badge variant={message.responded ? "success" : "secondary"}>
                        {message.responded ? "Responded" : "Awaiting Response"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(message.created_at), "PPP p")}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewMessage(message)}
                    >
                      View Details
                    </Button>
                    {!message.is_read && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => markAsRead(message.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                    <Button 
                      variant={message.responded ? "destructive" : "default"} 
                      size="sm"
                      onClick={() => toggleResponded(message.id, message.responded)}
                    >
                      {message.responded ? (
                        "Mark as Not Responded"
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Mark as Responded
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  From: {selectedMessage.name} ({selectedMessage.email})
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Received: {format(new Date(selectedMessage.created_at), "PPP p")}
                </p>
                <div className="bg-gray-50 p-4 rounded-md my-4">
                  <p className="whitespace-pre-line">{selectedMessage.message}</p>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Close
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      variant={selectedMessage.responded ? "destructive" : "default"}
                      onClick={() => toggleResponded(selectedMessage.id, selectedMessage.responded)}
                    >
                      {selectedMessage.responded ? (
                        "Mark as Not Responded"
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Mark as Responded
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => {
                        window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, '_blank');
                      }}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Reply via Email
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContactMessagesTab;
