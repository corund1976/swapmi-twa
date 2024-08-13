const tokens = (state) => state.balance.tokens

const dailyTokens = (state) => state.balance.dailyTokens
const dailyTickets = (state) => state.balance.dailyTickets

const withdrawStatus = (state) => state.balance.withdrawStatus
const transferStatus = (state) => state.balance.transferStatus

export default {
  tokens,

  dailyTokens,
  dailyTickets,

  withdrawStatus,
  transferStatus,
}