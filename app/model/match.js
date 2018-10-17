module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const MatchSchema = new Schema(
    {
      sportTitle: { type: String },
      sportAbbreviatedTitle: { type: String },
      sportEnglishTitle: { type: String },
      sportStatus: { type: String },
      stageTitle: { type: String },
    },
    { collection: 'Match', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('MatchSchema', MatchSchema)
}
