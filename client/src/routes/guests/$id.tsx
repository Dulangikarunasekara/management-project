import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateGuest, viewGuest } from '@/api/guest';
import { useEffect, useState } from 'react';
import type { updateGuestSchema } from '@/schema/update-guest';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
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
  const navigate = useNavigate();
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


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ data, id }: { data: Partial<updateGuestSchema>, id: string; }) =>
      updateGuest(data, id), onSuccess: (newGuest) => {
        queryClient.invalidateQueries({ queryKey: ["guests"] });

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
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      date_of_birth: values.dateOfBirth
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
      <Sheet open={open} onOpenChange={() => {
        setOpen(false);
        navigate({ to: '/guests' });
      }}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader className='shadow-md'>
            <SheetTitle>
              <div className='flex-col'>
                <h3>ID:{data.id}</h3>
                <span className='text-[10px]'>First Name: {data.firstName}</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className='p-3 '>
            <Form {...form} >
              <form
                onSubmit={form.handleSubmit((values) => handleUpdateGuest(values, params.id))}
                className="space-y-8 h-[550px]  overflow-y-scroll  no-scrollbar"              >


                <div className='bg-cell-bg text-text-primary p-2 rounded-sm'>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='px-3'>First Name</FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='bg-cell-bg text-text-primary p-2 rounded-sm'>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='px-3'>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="input last name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div className='bg-cell-bg text-text-primary p-2 rounded-sm'>


                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='px-3'>Phone Number</FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div className='bg-cell-bg text-text-primary p-2 rounded-sm'>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='px-3'>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>



                <div className='bg-cell-bg text-text-primary p-2 rounded-sm'>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='px-3'>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="input guest address" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>



                <div className='bg-cell-bg text-text-primary p-2 rounded-sm'>

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='px-3'>Date Of Birth</FormLabel>
                        <FormControl>
                          <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div className="flex justify-end mt-4">
                  <Button type="submit" className='px-3'>Update</Button>
                </div>
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

