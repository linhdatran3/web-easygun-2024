import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRegister } from '@/hooks/useRegister';
import { ROUTES } from '@/router/constants';

// Define the form schema
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username phải có ít nhất 2 ký tự',
    }),
    email: z.string().email({
      message: 'Vui lòng nhập địa chỉ Email.',
    }),
    password: z.string().min(6, {
      message: 'Password phải có ít nhất 6 ký tự.',
    }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu không chính xác',
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const { register } = useRegister();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await register({
        username: values.username,
        password: values.password,
        repassword: values.confirmPassword,
        email: values.email,
      });

      if (!res) {
        toast({ title: 'Đăng ký không thành công. Vui lòng thử lại!' });
        return;
      }

      toast({ title: 'Đăng ký thành công. Vui lòng đăng nhập vào hệ thống.' });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast({ title: 'Đăng ký không thành công. Vui lòng thử lại!' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="easygun" {...field} />
              </FormControl>
              <FormDescription>Tên hiển thị trên hệ thống.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="easygun@example.com" {...field} />
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
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Đăng Ký</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
