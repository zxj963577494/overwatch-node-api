module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const TeamSchema = new Schema(
    {
      teamId: { type: Number },
      handle: { type: String },
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
      rank: { type: String },
      logo: { type: String },
      icon: { type: String },
      secondaryPhoto: { type: String },
      owl_division: { type: String },
      accounts: { type: Array },
      teamWebsite: { type: String },
      attributes: { type: Object },
    },
    { collection: 'Team', timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
  )

  return mongoose.model('TeamSchema', TeamSchema)
}
