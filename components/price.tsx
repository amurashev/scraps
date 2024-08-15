import { FormattedNumber, FormatNumberOptions } from 'react-intl'

function Price({
  value,
  currency = 'USD',
  decimals = 2,
  maximumFractionDigits = 0,
  // To prevent safari 12 issue
  minimumFractionDigits = 0,
  ...props
}: {
  value: number
  currency?: string
  decimals?: number
} & FormatNumberOptions) {
  return (
    <span
      data-price-amount={Math.round(value * 100) / 100}
      data-price-currency-iso={currency}
    >
      <FormattedNumber
        value={value}
        // Because style is react prop name and here it is not an object
        // eslint-disable-next-line react/style-prop-object
        style="currency"
        currency={currency}
        maximumFractionDigits={maximumFractionDigits || decimals}
        minimumFractionDigits={minimumFractionDigits}
        {...props}
      />
    </span>
  )
}

export default Price
