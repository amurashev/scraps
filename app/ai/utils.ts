export const getMessage = (text: string, senderId: string) => {
  return {
    id: `temp_${Date.now()}_${senderId}`,
    date: Date.now(),
    text,
    type: 'text' as const,
    senderId,
  }
}
