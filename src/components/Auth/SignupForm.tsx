
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FlaskConical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  organization: z.string().min(2, { 
    message: "Organization name must be at least 2 characters" 
  }),
  role: z.enum(["pharma", "hospital", "regulator"], {
    required_error: "Please select a role",
  }),
});

type SignupFormProps = {
  onToggleMode: () => void;
};

const SignupForm = ({ onToggleMode }: SignupFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      organization: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            organization: values.organization,
            role: values.role
          }
        }
      });
      
      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created successfully",
          description: "Please check your email for verification",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="veridose-gradient p-3 rounded-lg mb-4 shadow-md">
          <FlaskConical className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Create your VeriDose account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your details to register
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="you@example.com" 
                    {...field} 
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your hospital or company" 
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pharma">Pharmaceutical Admin</SelectItem>
                    <SelectItem value="hospital">Hospital Staff</SelectItem>
                    <SelectItem value="regulator">Government Regulator</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This determines what features you can access
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0" onClick={onToggleMode}>
            Sign in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
