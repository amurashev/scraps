import classNames from 'classnames'

function ProgressBar({ count, index }: { count: number; index: number }) {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: count }, (_, i) => i + 1).map((_, key) => (
        <div
          key={key} // eslint-disable-line react/no-array-index-key
          className={classNames('bg-gray-200 h-[8px] rounded-lg flex-1', {
            'bg-teal-500': index > key,
          })}
        />
      ))}
    </div>
  )
}

export default ProgressBar
