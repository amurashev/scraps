import myersbriggs from '../data/myersbriggs.json'

const interpretationsData = {
  myersbriggs: (result: string) => {
    const scales = [
      ['E', 'I', [1, 5, 9, 13, 17]],
      ['S', 'N', [2, 6, 10, 14, 18]],
      ['T', 'F', [3, 7, 11, 15, 19]],
      ['J', 'P', [4, 8, 12, 16, 20]],
    ]

    const finalString = scales
      .map((scale) =>
        (scale[2] as number[]).filter((a) => result[Number(a - 1)] === '0')
          .length > 2
          ? scale[0]
          : scale[1]
      )
      .join('')

    const resultIndex = finalString as keyof typeof myersbriggs.resultMatrix
    const resultData = myersbriggs.resultMatrix[resultIndex]

    return resultData
      ? {
          index: resultIndex,
          title: resultData.title,
          description: resultData.description,
        }
      : undefined
  },
}

export default interpretationsData
