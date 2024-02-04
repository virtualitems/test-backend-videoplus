/**
 * @fileoverview
 */

// third-party dependencies
const mongoose = require('mongoose');


// constants
const mongouri = 'mongodb://localhost:27017/videoplus';


// models
const InteractionPersonVideo = mongoose.model(
  'InteractionPersonVideo',
  {
    video: { type: String, default: null },
    person: { type: String, default: null },
    like: { type: Boolean, default: false },
    comment: { type: String, default: null },
  },
  'person_video_interactions'
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

  async saveInteraction(person, video, data) {
    try {

      const like = data?.like;
      const comment = data?.comment === '' ? null : data?.comment;

      await InteractionPersonVideo.updateOne(
        { video: video.id, person: person.id },
        { $set: { video: video.id, person: person.id, like, comment } },
        { upsert: true }
      );

    } catch (error) {
      console.error('Error saving interactions:', error.message);
    }
  }

  async getInteractions(filters) {
    try {
      const interactions = await InteractionPersonVideo.find(filters);
      return interactions;
    } catch (error) {
      console.error('Error getting video interactions:', error.message);
    }
  }

}


/**
 * @exports
 */
module.exports = {
  MongoManager,
};
