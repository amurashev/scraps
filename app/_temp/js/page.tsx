function Item({
  title,
  children,
  answer,
}: {
  title: string
  answer?: string
  children?: React.ReactNode
}) {
  return (
    <li key={title} className="flex flex-col gap-1">
      <h5 className="font-bold">{title}</h5>
      {answer && <p className="text-muted-foreground">{answer}</p>}
      {children && <pre className="bg-muted p-3 rounded-sm">{children}</pre>}
    </li>
  )
}

export default async function JSPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-6 md:px-12 md:py-12">
      <div className="space-y-6 max-w-[960px]">
        <ul className="space-y-6">
          <Item
            title="Convert a JS value to a JSON string."
            answer="JSON.stringify()"
          >
            {"JSON.stringify({ key: 'value' })"}: {`'{"key":"value"}'`}
          </Item>
          <Item
            title="Perform a deep copy of a value, handling circular references."
            answer="A deep copy of an object is a copy whose properties do not share the same references (point to the same underlying values) as those of the source object from which the copy was made. As a result, when you change either the source or the copy, you can be assured you're not causing the other object to change too. That behavior contrasts with the behavior of a shallow copy, in which changes to nested properties in the source or the copy may cause the other object to change too."
          >
            <div>
              {
                'const ingredientsList = ["noodles", { list: ["eggs", "flour", "water"] }];'
              }
            </div>
            <div>
              const ingredientsListDeepCopy =
              JSON.parse(JSON.stringify(ingredientsList));
            </div>
          </Item>
          <Item
            title="Convert a JSON string back to a JS value."
            answer="JSON.parse()"
          >
            {`JSON.parse('{"key":"value"}')`}: {`{ key: 'value' }`}
          </Item>
          <Item
            title="Merge two objects, deeply combining properties."
            answer="Spread Operator and Object.assign()"
          />
          <Item
            title="Deep freeze an object, preventing any changes."
            answer="Object.freeze()"
          >
            {`const deepFreeze = (obj) => {
    Object.keys(obj).forEach((property) => {
        if (typeof obj[property] === "object"
            && obj[property] !== null &&
            !Object.isFrozen(obj[property])) {
            deepFreeze(obj[property]);
        }
    });
    return Object.freeze(obj);
};
`}
          </Item>
          <Item
            title="Write a polyfill for `typeof` to return the correct type."
            answer=""
          >
            {`const isNumber = (value) => !isNaN(parseFloat(value))
const isString = (value) => Object.prototype.toString.call(null) === "[object String]"
const isBoolean = (value) => value === false || value === true;
const isNull = (value) => value === null
const isUndefined = (value) => value === undefined
const isObject = (value) => Object.prototype.toString.call(null) === "[object Object]"
const isFunc = (value) => Object.prototype.toString.call(null) === "[object Function]"`}
          </Item>
          <Item title="Convert a JS object into a query string.">
            {`new URLSearchParams({ key: 'value'}).toString()`}
          </Item>
          <Item title="Parse a query string back into a JS object.">
            {`Object.fromEntries(new URLSearchParams("key=value"))`}
          </Item>
          <Item title="Compare two objects for deep equality.">
            JSON.stringify(a1) === JSON.stringify(a2)
          </Item>
          <Item title="Flatten a deeply nested object.">
            JSON.stringify(a1) === JSON.stringify(a2)
          </Item>
        </ul>
      </div>
    </main>
  )
}
