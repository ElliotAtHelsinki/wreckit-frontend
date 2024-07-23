export const uniqueIfy = <T>(array: T[]) => {
  return array.filter((value, index) => array.indexOf(value) === index)
}