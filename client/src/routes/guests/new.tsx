import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DatePicker from '@/components/date-picker'
import { type addGuestSchema } from '@/schema/add-guest'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGuest } from '@/api/guest'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEffect, useState } from 'react'

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters"
  }),
  lastName: z.string(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number cannot exceed 15 digits" })
    .regex(/^\+?[0-9\s-]+$/, { message: "Invalid phone number format" }),
  email: z
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  address: z.string(),
  dateOfBirth: z.date().max(tomorrow, { message: "Date of birth cannot be in the future" })
  ,
})

const AddUpdateGuest = () => {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      dateOfBirth: new Date()
    }
  })


  const queryClient = useQueryClient();
  const addGuestMutation = useMutation({
    mutationFn: (body: addGuestSchema) => addGuest(body),
    onSuccess: (newGuest) => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["guests"], exact: false });
      queryClient.setQueryData(["guests"], (old: any) =>
        old ? [...old, newGuest] : [newGuest]
      );
    }
  })

  const { mutate, isError, error, isSuccess } = addGuestMutation;

  useEffect(() => {
    if (isError) {
      alert(`Failed to add guest ${error}`);
    }
  }, [isError]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const body: addGuestSchema = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      date_of_birth: values.dateOfBirth
    }

    mutate(body);

  }



  return (
    <>

      <Sheet open={open} onOpenChange={() => {
        setOpen(false);
        navigate({ to: "/guests" })
      }}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader className='shadow-md'>
            <SheetTitle>New Guest Record</SheetTitle>
          </SheetHeader>

          <div className='p-3 '>
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-[550px]  overflow-y-scroll  no-scrollbar">
                <div className='bg-cell-bg text-text-primary p-2 rounded-sm'>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='px-3'>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="input first name" {...field} className='' />
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
                          <Input placeholder="input phone number" {...field} />
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
                          <Input placeholder="input email" {...field} />
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


                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>

      {isSuccess && <span>Guest added successfully</span>}


    </>
  )
}


export const Route = createFileRoute('/guests/new')({
  component: AddUpdateGuest,
})