import { createFileRoute, useParams } from '@tanstack/react-router'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import { updateGuest, viewGuest } from '@/api/guest';
import { useCallback, useEffect, useState } from 'react';
import type { updateGuestSchema } from '@/schema/update-guest';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/date-picker';


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



const GuestDetail = () => {

  const params = useParams({ from: '/guests/$id' });
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      dateOfBirth: new Date()
    }
  })


  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<updateGuestSchema> }) =>
      updateGuest(data, id), onSuccess: newGuest => {
        queryClient.setQueryData(['guests', params.id], newGuest);
        alert("Guest updated successfully")
      },
    onError: (error) => {
      console.log(error)
    },
    

  })


  const handleUpdateGuest = (
    values: z.infer<typeof formSchema>,
    id: string
  ) => {
    const body: Partial<updateGuestSchema> = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumer: Number(values.phone),
      address: values.address,
      dateOfBirth: values.dateOfBirth
    }

    mutation.mutate({ id, data: body })
  }




  const { data, error, isLoading } = useQuery({
    queryKey: ['guests', params.id],
    queryFn: () => viewGuest(params.id),

  });

  useEffect(() => {
    if (params.id) setOpen(true)
  }, [params.id, data])

  useEffect(() => {
    if (!data) return;

    form.setValue("firstName", data.firstName);
    form.setValue("lastName", data.lastName);
    form.setValue("email", data.email);
    form.setValue("phone", data.phone);
    form.setValue("address", data.address);
    form.setValue("dateOfBirth", new Date(data.dateOfBirth));
  }, [data, form]);



  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  if (!data) return <span>No guest found.</span>;


  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[300px] overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>{data.id}</SheetTitle>
          </SheetHeader>
          <div>
            <Form {...form} >
              <form
                onSubmit={form.handleSubmit((values) => handleUpdateGuest(values, params.id))}
                className="space-y-8 bg-amber-500"
              >                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input  {...field} />
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
                        <Input  {...field} />
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
                        <Input {...field} />
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

                <Button type="submit">update</Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export const Route = createFileRoute('/guests/$id')({
  component: GuestDetail,
})

