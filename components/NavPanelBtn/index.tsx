import { useRouter } from 'next/router'
import { memo, useEffect, useState } from 'react'

function NavPanelBtn({
  isEnd,
  pathname,
}: {
  isEnd: boolean
  pathname: string
}) {
  const [page, setPage] = useState(1)

  const needPanel = !(isEnd && page === 1)
  const router = useRouter()

  useEffect(() => {
    const routes = window.location.pathname.split('/')
    const numberPage = parseInt(routes[routes.length - 1]) || 1

    setPage(numberPage)
  }, [])

  const handlePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const contextBtn = event.currentTarget.textContent
    const query = router.query

    let toPage: number

    if (contextBtn === 'Next') {
      setPage((prevPage) => prevPage + 1)
      toPage = page + 1
    }

    if (contextBtn === 'Previous') {
      if (page > 1) {
        setPage((prevPage) => prevPage - 1)
        toPage = page - 1
      }
    }

    pathname += query?.cardInfo
      ? `/${query.cardInfo[0]}/${toPage}`
      : `/${toPage}`

    router.push({ pathname }, undefined, {
      shallow: false,
    })
  }

  return (
    <>
      {needPanel && (
        <div className="panelBtn">
          <button
            className="navBtn"
            onClick={handlePage}
            disabled={page === 1 ? true : false}
            aria-disabled={page === 1 ? 'true' : 'false'}
          >
            Previous
          </button>
          <button
            className="navBtn"
            onClick={handlePage}
            disabled={isEnd ? true : false}
            aria-disabled={isEnd ? 'true' : 'false'}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default memo(NavPanelBtn)
