function Education({
  education,
}: {
  education: {
    year: number
    school: string
    country: string
    field: string
    degree: string
  }[]
}) {
  return (
    <ul>
      {education.map((item) => (
        <li key={item.school}>
          <h5 className="font-bold">
            {item.school} ({item.country})
          </h5>
          <div>
            <span>{item.field}</span>&nbsp;&mdash;&nbsp;
            <span>{item.degree}</span>
          </div>
          <div className="text-muted-foreground">{item.year}</div>
        </li>
      ))}
    </ul>
  )
}

export default Education
