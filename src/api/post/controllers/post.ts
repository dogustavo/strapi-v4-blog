/**
 * post controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx);

      const query = strapi.db.query("api::post.post");

      await Promise.all(
        data.map(async (item, index) => {
          const post = await query.findOne({
            where: {
              id: item.id,
            },
            populate: ["createdBy"],
          });

          data[
            index
          ].attributes.createdBy = `${post.createdBy.firstname} ${post.createdBy.lastname}`;
        })
      );

      return { data, meta };
    },
    async findOne(ctx) {
      const { data, meta } = await super.findOne(ctx);

      const query = strapi.db.query("api::post.post");

      const post = await query.findOne({
        where: {
          id: data.id,
        },
        populate: ["createdBy"],
      });

      data.attributes.createdBy = `${post.createdBy.firstname} ${post.createdBy.lastname}`;

      return { data, meta };
    },
  })
);
