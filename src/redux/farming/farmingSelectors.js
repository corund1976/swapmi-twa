const isFarming = (state) => state.farming.isFarming

const progressReward = (state) => state.farming.progressReward
const progressPercent = (state) => state.farming.progressPercent

const reward = (state) => state.farming.reward

export default {
  isFarming,

  progressReward,
  progressPercent,

  reward,
}