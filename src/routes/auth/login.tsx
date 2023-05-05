import type { VoidComponent } from "solid-js"

import type { SubmitHandler } from "@modular-forms/solid"
import { createForm, zodForm } from "@modular-forms/solid"
import { signIn } from "@solid-auth/base/client"
import type { z } from "zod"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Link } from "~/components/ui/link"
import { loginSchema } from "~/lib/validation/auth"

type LoginForm = z.input<typeof loginSchema>

const Login: VoidComponent = () => {
  const [_loginForm, { Form, Field }] = createForm<LoginForm>({
    validate: zodForm(loginSchema)
  })

  const submit: SubmitHandler<LoginForm> = async (values, _event) => {
    const _signInReturn = await signIn("credentials", {
      email: values.email.toLowerCase(),
      password: values.password,
      redirect: false
    })

    console.log("this is never called")
  }

  return (
    <div class="flex h-screen items-center justify-center">
      <Form onSubmit={submit}>
        <Card>
          <CardHeader class="text-center">
            <CardTitle class="text-2xl font-bold tracking-tighter">Welcome Back!</CardTitle>
          </CardHeader>
          <CardContent class="space-y-2">
            <Field name="email">
              {(field, props) => (
                <div>
                  <Label for={field.name}>Email</Label>
                  <Input
                    {...props}
                    id={field.name}
                    value={field.value}
                    type="email"
                    autoCapitalize="none"
                    autocomplete="email"
                    autocorrect="off"
                    required
                  />
                  {field.error && <p class="pt-2 text-xs text-red-600">{field.error}</p>}
                </div>
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <div>
                  <Label for={field.name}>Password</Label>
                  <Input
                    {...props}
                    id={field.name}
                    value={field.value}
                    type="password"
                    autoCapitalize="none"
                    autocomplete="password"
                    autocorrect="off"
                    required
                  />
                  {field.error && <p class="pt-2 text-xs text-red-600">{field.error}</p>}
                </div>
              )}
            </Field>
          </CardContent>
          <CardFooter class="flex flex-col items-stretch">
            <Button type="submit">test</Button>
            <Link href="/auth/reset-password">Forgot your password?</Link>
          </CardFooter>
        </Card>
      </Form>
    </div>
  )
}
export default Login
