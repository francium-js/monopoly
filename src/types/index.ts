export type ValueOf<T extends string> = `${T}`

export type UnionToIntersection<U> = (
  U extends object ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type ArrayElement<ArrayType> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type FormChoiseTextT = { content: string; id: number }

export type FormChoiceT = {
  text: FormChoiseTextT[]
  correct: boolean
  id: number
}
