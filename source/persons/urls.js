/**
 * @fileoverview URLs for the persons context.
 */


// constants
const baseUrl = '/users';


/**
 * @exports
 */
module.exports = {
  media: '/media/persons',
  index: baseUrl + '/',
  model: baseUrl + '/:slug',
  modelEdit: baseUrl + '/:slug/edit',
  profile: baseUrl + '/profile',
  profileEdit: baseUrl + '/profile/edit',
  register: baseUrl + '/register',
  relatedVideos: baseUrl + '/:slug/videos',
};
