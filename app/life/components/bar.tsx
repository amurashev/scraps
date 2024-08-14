import classNames from 'classnames'

function Bar({ type }: { type: 'regular' | 'lightGreen' | 'green' }) {
  return (
    <div
      className={classNames(
        'w-[10px] h-[10px] bg-gray-100 cursor-pointer rounded-sm',
        {
          'bg-teal-100': type === 'lightGreen',
          'bg-teal-200': type === 'green',
        }
      )}
    />
  )
}

export default Bar
