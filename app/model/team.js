module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const TeamSchema = new Schema(
    {
      name: { type: String },
      abbreviatedName: { type: String },
      homeLocation: { type: String },
      primaryColor: { type: String },
      secondaryColor: { type: String },
      addressCountry: { type: String },
      description: { type: String },
      createdTime: { type: Date },
      status: { type: String },
      manager: { type: String },
      coaches: { type: String },
      rank: { type: Array },
      logo: { type: Array },
      icon: { type: String },
      createAt: { type: Date, default: Date.now },
      updateAt: { type: Date },
    },
    { collection: 'Team' }
  )

  return mongoose.model('TeamSchema', TeamSchema)
}
