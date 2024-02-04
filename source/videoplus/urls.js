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
  interactions: baseUrl + '/:slug/interactions',
};
