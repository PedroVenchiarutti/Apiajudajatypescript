import moment from "dayjs"

export const dateFormat = (date: Date) => {
  const day = moment(date).format("DD/MM/YYYY")
  return day
}

export const timeFormat = (date: Date) => {
  const time = moment(date).format("HH:mm")
  return time
}
