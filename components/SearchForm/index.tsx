import { defaultSearch } from 'consts/configUrl'
import { useRouter } from 'next/router'
import { FormEvent, useEffect } from 'react'

function SearchForm({ inHeader }: { inHeader?: boolean }) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const name = event.currentTarget.search.value as string

    const search = name.toLowerCase()
      ? { pathname: `/search/cards/${name}/1` }
      : defaultSearch

    event.preventDefault()
    event.currentTarget.search.value = ''
    router.push(search, undefined, { shallow: false })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="form__search">
        <span
          className={inHeader ? 'form__lens form__lens_inHeader' : 'form__lens'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={inHeader ? '18' : '24'}
            height={inHeader ? '18' : '24'}
            viewBox="0 0 24 24"
            fill="#f0f0f0"
          >
            {' '}
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
        </span>
        <input
          className={
            inHeader
              ? 'form-search__input form-search__input_inHeader'
              : 'form-search__input'
          }
          type="search"
          name="search"
          placeholder="Search for a card"
          autoFocus={
            router.pathname === '/login' || router.pathname === '/cart/payment'
              ? false
              : true
          }
          autoComplete="off"
        />
      </label>
    </form>
  )
}

export default SearchForm
