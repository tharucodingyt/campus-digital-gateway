
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define type for admissions settings
interface AdmissionsSettings {
  id: string;
  application_form_url: string | null;
  application_instructions: string | null;
  created_at: string;
  updated_at: string;
}

const formSchema = z.object({
  application_form_url: z.string().url("Please enter a valid URL"),
  application_instructions: z.string().min(10, "Instructions must be at least 10 characters"),
});

const AdminAdmissionsTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application_form_url: "",
      application_instructions: "",
    },
  });

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        // Use type assertion to work around type checking for the table
        const { data, error } = await supabase
          .from('admissions_settings')
          .select('*')
          .single() as { data: AdmissionsSettings | null, error: any };

        if (error) throw error;

        if (data) {
          form.reset({
            application_form_url: data.application_form_url || '',
            application_instructions: data.application_instructions || '',
          });
        }
      } catch (error: any) {
        console.error("Error loading admissions settings:", error);
        toast({
          title: "Error",
          description: "Failed to load admissions settings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, [form, toast]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    try {
      // First get the ID
      const { data: idData } = await supabase
        .from('admissions_settings')
        .select('id')
        .single() as { data: { id: string } | null, error: any };
      
      // Then update the record
      if (idData) {
        const { error } = await supabase
          .from('admissions_settings')
          .update({
            application_form_url: values.application_form_url,
            application_instructions: values.application_instructions,
          })
          .eq('id', idData.id) as { error: any };
        
        if (error) throw error;

        toast({
          title: "Success",
          description: "Admissions settings updated successfully",
        });
      }
    } catch (error: any) {
      console.error("Error updating admissions settings:", error);
      toast({
        title: "Error",
        description: "Failed to update admissions settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admissions Settings</CardTitle>
        <CardDescription>
          Configure the application form URL and instructions for prospective students
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="application_form_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Form URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://docs.google.com/forms/..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the URL for your Google Form or other external application form
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="application_instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Instructions</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please fill out our online application form..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide instructions for applicants about how to complete the application process
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full sm:w-auto" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Settings"
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminAdmissionsTab;
