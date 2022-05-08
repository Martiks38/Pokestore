import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import NavPanelBtn from 'components/NavPanelBtn'
import SearchForm from 'components/SearchForm'
import getCards from 'services/getCards'
import { apiUrl } from 'consts/configUrl'
import { CardV2 } from 'interface/cardMarket'
import UpButton from 'components/UpButton'
import ListCards from 'components/ListCards'
import PlaceholderCards from 'components/PlaceholderCards'

const pageSize = 30

export default function SearchPage(props: { cards: CardV2[] }) {
  const [viewSearch, setViewSearch] = useState(false)

  const { cards } = props

  const handleViewSearch = useCallback(() => {
    const isNarrow = window.innerWidth < 550

    isNarrow ? setViewSearch(true) : setViewSearch(false)
  }, [])

  useEffect(() => {
    handleViewSearch()
    window.addEventListener('resize', handleViewSearch)

    return () => window.removeEventListener('resize', handleViewSearch)
  }, [handleViewSearch])

  if (useRouter().isFallback) return <PlaceholderCards />

  return (
    <>
      <div className="resultsSearch">
        {viewSearch && (
          <div className="resultsSearch__form">
            <SearchForm />
          </div>
        )}
        <div className="resultsSearch__results">
          <ListCards cards={cards} />
        </div>
        <NavPanelBtn isEnd={cards.length < pageSize} pathname="/search/page" />
      </div>
      <UpButton />
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ number: string }> = async () => {
  return {
    paths: [{ params: { number: '1' } }, { params: { number: '2' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const { number } = params

  const paramsV2 = `?page=${number}&pageSize=${pageSize}`
  const url = `${apiUrl}/cards/${paramsV2}`

  const cards = await Promise.resolve(getCards(url))

  return {
    props: {
      cards,
    },
  }
}
