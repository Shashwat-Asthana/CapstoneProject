
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getUserByEmail } from '@/lib/api'; // Changed from checkUserCredentials to getUserByEmail
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

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check if user exists in the database
      const user = await getUserByEmail(values.email);
      
      // In a real app, you would also check the password
      // For now, we'll just check if the user exists
      if (user) {
        // Set authentication
        localStorage.setItem('auth_user', JSON.stringify(user));
        
        // Show success toast
        toast({
          title: 'Login successful',
          description: 'You have been logged in successfully.',
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Show error toast
        toast({
          title: 'Login failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
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
        <h2 className="text-2xl font-bold tracking-tight">Login to Your Account</h2>
        <p className="text-muted-foreground mt-2">
          Enter your credentials to access your account
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-950 rounded-lg border p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
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
                    <Input placeholder="••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
