'use client'

import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import FormField from '../../components/form-field'
import { validateEmail } from '../utils'

type FormData = {
  username: string
  email: string
}

export default function Form({
  username,
  email,
}: {
  username: string
  email: string
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username,
      email,
    },
  })
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    if (data.username !== 'admin') {
      toast({
        description: 'User name is already taken',
        variant: 'destructive',
      })
    } else {
      toast({
        description: 'Settings are saved',
        variant: 'default'
      })
    }
  }

  const onFormError: SubmitErrorHandler<FormData> = async (err) => {
    const keys = Object.keys(err)

    keys.forEach((key) => {
      const errorMessage = err[key as keyof typeof err]?.message

      toast({
        description: errorMessage,
        variant: 'destructive',
      })
    })

    console.error(err)
  }

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit, onFormError)()
      }}
    >
      <Controller
        name="username"
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 5,
            message: 'Username is too short (minimum is 5 characters)',
          },
        }}
        render={({ field }) => (
          <FormField
            label="User name"
            htmlFor="username"
            errorMessage={errors.username?.message}
            description="Human-friendly label for your organization, shown in user interfaces"
          >
            <Input
              type="text"
              placeholder="username"
              hasError={Boolean(errors.username?.message)}
              {...field}
            />
          </FormField>
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          validate: (value: string) => {
            if (!validateEmail(value)) {
              return 'Email is incorrect'
            }
            return true
          },
        }}
        render={({ field }) => (
          <FormField
            label="Email"
            htmlFor="email"
            errorMessage={errors.email?.message}
            description="The email address associated with this account"
          >
            <Input
              type="email"
              placeholder="name@example.com"
              hasError={Boolean(errors.email?.message)}
              {...field}
            />
          </FormField>
        )}
      />

      <Button type="submit">Save</Button>
    </form>
  )
}
