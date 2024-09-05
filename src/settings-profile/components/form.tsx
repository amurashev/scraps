'use client'

import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { useUserData } from '@/contexts/user-data'
import { updateUser } from '@/lib/endpoints/auth'

import FormField from '../../settings/components/form-field'
import { validateEmail } from '../utils'

type FormData = {
  email: string
  firstName: string
  lastName: string
}

export default function Form() {
  const route = useRouter()
  const userData = useUserData()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: userData?.email,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
    },
  })
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    const response = await updateUser({
      id: userData?.id as string,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    })

    if (response.data) {
      toast({
        description: 'Settings are saved',
        variant: 'default',
      })
      route.refresh()
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

    console.error(err) // eslint-disable-line no-console
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
            description="Ask admin to change it ;)"
          >
            <Input
              type="email"
              placeholder="name@example.com"
              disabled
              hasError={Boolean(errors.email?.message)}
              {...field}
            />
          </FormField>
        )}
      />
      <Controller
        name="firstName"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'First name is required',
          },
          minLength: {
            value: 2,
            message: 'First name is too short (minimum is 2 characters)',
          },
        }}
        render={({ field }) => (
          <FormField
            label="First name"
            htmlFor="username"
            errorMessage={errors.firstName?.message}
            // description="Human-friendly label for your organization, shown in user interfaces"
          >
            <Input
              type="text"
              placeholder="John"
              hasError={Boolean(errors.firstName?.message)}
              {...field}
            />
          </FormField>
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Last name is required',
          },
          minLength: {
            value: 2,
            message: 'Last name is too short (minimum is 2 characters)',
          },
        }}
        render={({ field }) => (
          <FormField
            label="Last name"
            htmlFor="lastName"
            errorMessage={errors.lastName?.message}
            // description="Human-friendly label for your organization, shown in user interfaces"
          >
            <Input
              type="text"
              placeholder="Smith"
              hasError={Boolean(errors.lastName?.message)}
              {...field}
            />
          </FormField>
        )}
      />

      <Button type="submit">Save</Button>
    </form>
  )
}
