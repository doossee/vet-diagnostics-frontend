'use client'

import { z } from "zod"
import { toast } from "sonner"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TOAST_OPTIONS } from '~/constants'
import { useRouter } from '~/i18n/routing'
import { useTranslations } from "next-intl"
import { Input } from "~/components/ui/input"
import { authControllerLogin } from '~/lib/api'
import { Button } from "~/components/ui/button"
import { useAuthData } from '~/hooks/use-auth-data'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

export function LoginForm() {
  const router = useRouter()
  const t = useTranslations()
  const { setAuthData } = useAuthData()
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    phone: z.string().min(1, t('login.phoneRequired')),
    password: z.string().min(6, t('login.passwordRequired')),
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
      setLoading(true)
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
      console.log(error);
      toast(t("login.authError"), TOAST_OPTIONS)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-[400px] w-full shadow-none rounded-md">
      <CardHeader>
        <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("login.phone")}</FormLabel>
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
                  <FormLabel>{t("login.password")}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t("login.password")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button disabled={loading} type="submit" className="w-full">{t(loading?"form.submiting":"login.submit")}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}