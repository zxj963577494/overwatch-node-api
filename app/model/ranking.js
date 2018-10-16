module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const RankingSchema = new Schema(
    {
      content: { type: Array },
      comparisons: { type: Array },
      totalMatches: { type: Number },
      matchesConcluded: { type: Number },
      playoffCutoff: { type: Number },
    },
    { collection: 'Ranking', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('Ranking', RankingSchema)
}
