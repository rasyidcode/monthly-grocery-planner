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
  // create users table
  pgm.createTable("users", {
    id: "id",
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    email: {
      type: "varchar(200)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(100)",
      notNull: true,
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // create plans table
  pgm.createType("status", ["planning", "shopping", "completed"]);
  pgm.createTable("plans", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    month: {
      type: "smallint",
      notNull: true,
    },
    year: {
      type: "smallint",
      notNull: true,
    },
    status: {
      type: "status",
      default: "planning",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("plans", "userId");

  // create items table
  pgm.createTable("items", {
    id: "id",
    planId: {
      type: "integer",
      notNull: true,
      references: "plans",
      onDelete: "CASCADE",
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    qty: {
      type: "smallint",
      default: 1,
      notNull: true,
    },
    price: {
      type: "integer",
      notNull: true,
    },
  });
  pgm.createIndex("items", "planId");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
  pgm.dropTable("users");
};

module.exports = {
  shorthands,
  up,
  down,
};
