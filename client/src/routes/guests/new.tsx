import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/date-picker'
import { type addGuestSchema } from '@/schema/add-guest'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGuest } from '@/api/guest'
import { useState } from 'react'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters"
  }),
  lastName: z.string(),
  phone: z.string(),
  email: z.email(),
  address: z.string(),
  dateOfBirth: z.date(),
})

const AddUpdateGuest = () => {
  const navigate = useNavigate();
  const [isVisible , setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName:"",
      phone:"",
      address:"",
      dateOfBirth:new Date()
    }
  })


  const queryClient = useQueryClient();
  const addGuestMutation = useMutation({
    mutationFn: (body: addGuestSchema) => addGuest(body),
    onSuccess: () => form.reset()
  })

  const { mutate,  isError, error, isSuccess } = addGuestMutation;

  
  if (isError) {
    return <span>{`An error has occurred: ${error.message}`}</span>;
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const body: addGuestSchema = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumer: Number(values.phone),
      address: values.address,
      dateOfBirth: values.dateOfBirth
    }

    mutate(body);

  }





  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-amber-500">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="input first name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="input last name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="input phone number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
                  <Input placeholder="input email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="input guest address" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>date of birth</FormLabel>
                <FormControl>
                  <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {isSuccess && <span>Guest added successfully</span>}


    </>
  )
}


export const Route = createFileRoute('/guests/new')({
  component: AddUpdateGuest,
})