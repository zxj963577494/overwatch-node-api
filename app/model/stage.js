module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const StageSchema = new Schema(
    {
      sportTitle: { type: String },
      sportAbbreviatedTitle: { type: String },
      sportEnglishTitle: { type: String },
      sportStatus: { type: String },
      title: { type: String },
      endDate: { type: Date },
      status: { type: String },
    },
    { collection: 'Stage', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('StageSchema', StageSchema)
}
