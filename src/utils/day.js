import Dayjs from 'dayjs'

const plugin = (option, dayjsClass) => {
  dayjsClass.prototype.lastMonday = () => {
    const today = Dayjs()
    const diff = today.day() === 0 ? 6 : today.day() - 1

    return today.subtract(diff, 'day')
  }
}

Dayjs.extend(plugin)

export const dayjs = Dayjs
