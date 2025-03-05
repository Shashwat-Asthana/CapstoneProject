
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { checkAdminCredentials } from '@/lib/api'; // Changed from database to api
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { LockKeyhole } from 'lucide-react';

const formSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check admin credentials
      const isAdmin = checkAdminCredentials(values.password);
      
      if (isAdmin) {
        // Set admin authentication - using localStorage instead of unavailable setAdminAuth
        localStorage.setItem('admin_auth', 'true');
        
        // Show success toast
        toast({
          title: 'Admin login successful',
          description: 'You now have admin access.',
        });
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        // Show error toast
        toast({
          title: 'Admin login failed',
          description: 'Invalid admin password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: 'Login failed',
        description: 'There was an error logging in.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-3 rounded-full">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight mt-4">Admin Access</h2>
        <p className="text-muted-foreground mt-2">
          Enter the admin password to access the admin dashboard
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-950 rounded-lg border p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Access Admin Panel'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
