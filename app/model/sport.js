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
      levels: { type: String },
      type: { type: String },
      teamCount: { type: Number },
      country: { type: String },
      stages: [{ type: Schema.Types.ObjectId, ref: 'Stage' }],
    },
    { collection: 'Sport', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('SportSchema', SportSchema)
}
