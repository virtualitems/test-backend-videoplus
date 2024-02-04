/**
 * @fileoverview
 */

// third-party dependencies
const mongoose = require('mongoose');

// constants
const mongouri = 'mongodb://localhost:27017/videoplus';

// models
const VideoInteraction = mongoose.model(
  'VideoInteraction',
  {
    person: { type: String, default: null },
    like: { type: Boolean, default: false },
    comment: { type: String, default: null },
  },
  'video_interactions'
);

const PersonInteraction = mongoose.model(
  'PersonInteraction',
  {
    video: { type: String, default: null },
    like: { type: Boolean, default: false },
    comment: { type: String, default: null },
  },
  'person_interactions'
);


class MongoManager {
  constructor() {
    this.connection = null;
    this.connect();
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(mongouri);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async disconnect() {
    try {
      await this.connection.disconnect();
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }

  async saveInteractions(person, video, data) {
    try {

      await PersonInteraction.updateOne(
        { video: video.slug },
        { $set: { video: video.slug, ...data } },
        { upsert: true }
      );

      await VideoInteraction.updateOne(
        { person: person.slug },
        { $set: { person: person.slug, ...data } },
        { upsert: true }
      );

    } catch (error) {
      console.error('Error saving interactions:', error.message);
    }
  }

}


/**
 * @exports
 */
module.exports = {
  MongoManager,
};
