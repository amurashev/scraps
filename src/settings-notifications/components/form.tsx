'use client'

import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

import SwitchField from '../../settings/components/switch-field'

type FormData = {
  communication: boolean
  marketing: boolean
}

export default function Form({ communication, marketing }: FormData) {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      communication,
      marketing,
    },
  })
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    const values = Object.keys(data).map(
      (key) => data[key as keyof typeof data]
    )
    const hasOnlyFalse = values.every((item) => !item)

    if (hasOnlyFalse) {
      toast({
        description: 'You should be subscribed for at least one type',
        variant: 'destructive',
      })
    } else {
      toast({
        description: 'Notification settings are saved',
        variant: 'default',
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
      <h2 className="font-bold text-xl">Email Notifications</h2>

      <div className="space-y-3 max-w-full">
        <div className="space-y-3">
          <Controller
            name="communication"
            control={control}
            render={({ field }) => (
              <SwitchField
                label="Communication emails"
                description="Receive emails about your account activity."
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Separator />

          <Controller
            name="marketing"
            control={control}
            render={({ field }) => (
              <SwitchField
                label="Marketing emails"
                description="Receive emails about new products, features, and more."
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}
