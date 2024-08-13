import { Message } from '../../types'

const Chat = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="">
      {messages.map((item) => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  )
}

export default Chat
