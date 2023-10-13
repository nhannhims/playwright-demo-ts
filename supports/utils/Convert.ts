export const convertPriceToNumber = async (price: string) => {
    price = price.replace('¥', '').replace(',', '').trim()
    return Number(price)
}