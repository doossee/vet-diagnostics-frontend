'use client'

import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { TOAST_OPTIONS } from '~/constants'
import { useRouter } from 'next/navigation'
import { Input } from "~/components/ui/input"
import { authControllerLogin } from '~/lib/api'
import { Button } from "~/components/ui/button"
import { useAuthData } from '~/hooks/use-auth-data'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

export function LoginForm() {
  const router = useRouter()
  const { setAuthData } = useAuthData()

  const formSchema = z.object({
    phone: z.string().min(1, 'Telefon raqam kiritilishi shart'),
    password: z.string().min(6, "Parol 8 ta belgidan kichik bo'lmasligi kerak"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })
  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const {accessToken, refreshToken, ...user} = await authControllerLogin(values)
      setAuthData(accessToken, 'ACCESS_TOKEN')
      setAuthData(refreshToken, 'REFRESH_TOKEN')
      setAuthData(JSON.stringify(user), 'USER_DATA')
      
      if(user.userRole === "ADMIN"){
        router.push('/animal-types')
      } else if(user.userRole === "VETERINARIAN") {
        router.push('/farmers')
      } else if(user.userRole === "FARMER") {
        router.push('/animals')
      }
    } catch (error) {
      toast("Telefon yoki Parol noto'g'ri", TOAST_OPTIONS)
    }
  }

  return (
    <Card className="mx-auto max-w-[400px] w-full shadow-none rounded-md">
      <CardHeader>
        <CardTitle className="text-2xl">Tizimga kirish</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon raqam</FormLabel>
                  <FormControl>
                    <Input placeholder="+998 XX XXX XX XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parol</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Parol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">Kirish</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}