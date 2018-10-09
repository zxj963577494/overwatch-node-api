module.exports = app => {
  const { mongoose } = app
  const { Schema } = mongoose

  const HeroSchema = new Schema(
    {
      name: { type: String },
      real_name: { type: String },
      role: { type: String },
      description: { type: String },
      remark: { type: String },
      base_of_operations: { type: String },
      age: { type: String },
      difficulty: { type: String },
      fullshot: { type: String },
      affiliation: { type: String },
      extra: { type: Array },
      abilities: { type: Array },
      avatar: { type: String },
      profession: { type: String },
      height: { type: String },
      health: { type: String },
      armour: { type: String },
      shield: { type: String },
      createAt: { type: Date },
      updateAt: { type: Date },
    },
    { collection: 'Hero' }
  )

  return mongoose.model('Hero', HeroSchema)
}