let month = 1

export let months: number[] = Array(12)
  .fill('')
  .map(() => month++)

const MIN_YEAR = new Date().getFullYear()
const MAX_YEAR = new Date().getFullYear() + 100

let year = MIN_YEAR
export const years: number[] = Array(MAX_YEAR - MIN_YEAR)
  .fill('')
  .map(() => year++)
