import { exchangeRate } from 'consts/exchangeRate'
import { CardV2 } from 'interface/cardMarket'
import { typeCard } from 'types/typeCard'

const getCardPrice = (card: CardV2) => {
  let price

  if (card?.tcgplayer?.prices) {
    const typeCard = Object.keys(card.tcgplayer.prices)[0] as typeCard
    const pricesList = card.tcgplayer.prices[typeCard]

    // To ensure that it shows at least one value, the first one in the list will be taken
    price = pricesList.market ?? pricesList.mid ?? Object.values(pricesList)[0]
  } else if (card?.cardmarket?.prices) {
    const pricesList = card.cardmarket.prices

    // To ensure that it shows at least one value, the first one in the list will be taken
    price =
      pricesList.averageSellPrice ??
      pricesList.avg7 ??
      Object.values(pricesList)[0]
  }

  // There are cards that are priceless, so we will say that there's no stock.
  return price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: exchangeRate,
      }).format(price)
    : 'OUT OF STOCK'
}

export default getCardPrice
