/**
 * @fileoverview URLs for the videoplus context.
 */


// constants
const baseUrl = '/videos';


/**
 * @exports
 */
module.exports = {
  media: '/media/videoplus',
  index: baseUrl + '/',
  model: baseUrl + '/:slug',
  likes: baseUrl + '/:slug/likes',
  comments: baseUrl + '/:slug/comments',
};
