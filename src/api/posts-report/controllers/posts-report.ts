module.exports = {
  async findAllSlugs(ctx, next) {
    try {
      const posts = await strapi.entityService.findMany("api::post.post", {
        fields: ["id"],
        limit: -1,
      });

      ctx.body = posts;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
