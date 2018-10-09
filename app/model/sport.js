module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const SportSchema = new Schema(
    {
      title: { type: String },
      abbreviatedTitle: { type: String },
      englishTitle: { type: String },
      description: { type: String },
      logo: { type: String },
      pic: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      status: { type: String },
      createAt: { type: Date },
      updateAt: { type: Date },
    },
    { collection: 'Sport' }
  )

  return mongoose.model('SportSchema', SportSchema)
}
