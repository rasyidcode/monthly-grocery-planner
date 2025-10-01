/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const up = (pgm) => {
  pgm.renameColumn("users", "createdAt", "created_at");
  pgm.renameColumn("plans", "userId", "user_id");
  pgm.renameColumn("items", "planId", "plan_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
  pgm.renameColumn("users", "created_at", "createdAt");
  pgm.renameColumn("plans", "user_id", "userId");
  pgm.renameColumn("items", "plan_id", "planId");
};

module.exports = {
  shorthands,
  up,
  down,
};
