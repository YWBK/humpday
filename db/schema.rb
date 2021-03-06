# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_08_192730) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "account_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_name"], name: "index_accounts_on_account_name", unique: true
  end

  create_table "board_members", force: :cascade do |t|
    t.integer "board_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_board_members_on_board_id"
    t.index ["user_id", "board_id"], name: "index_board_members_on_user_id_and_board_id", unique: true
    t.index ["user_id"], name: "index_board_members_on_user_id"
  end

  create_table "boards", force: :cascade do |t|
    t.string "board_name", null: false
    t.integer "workspace_id", null: false
    t.integer "board_owner_id", null: false
    t.integer "board_permissions", default: 4
    t.text "column_ids", default: [], null: false, array: true
    t.text "group_ids", default: [], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_name"], name: "index_boards_on_board_name"
    t.index ["board_owner_id"], name: "index_boards_on_board_owner_id"
    t.index ["column_ids"], name: "index_boards_on_column_ids"
    t.index ["group_ids"], name: "index_boards_on_group_ids"
    t.index ["workspace_id"], name: "index_boards_on_workspace_id"
  end

  create_table "columns", force: :cascade do |t|
    t.string "column_name", default: "Item", null: false
    t.string "column_type", default: "item", null: false
    t.integer "board_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_columns_on_board_id"
  end

  create_table "due_dates", force: :cascade do |t|
    t.integer "item_id", null: false
    t.integer "column_id", null: false
    t.datetime "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["column_id"], name: "index_due_dates_on_column_id"
    t.index ["item_id", "column_id"], name: "index_due_dates_on_item_id_and_column_id", unique: true
    t.index ["item_id"], name: "index_due_dates_on_item_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "group_name", default: "New Group", null: false
    t.string "group_color", null: false
    t.integer "board_id", null: false
    t.text "item_ids", default: [], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_groups_on_board_id"
    t.index ["item_ids"], name: "index_groups_on_item_ids"
  end

  create_table "item_people", force: :cascade do |t|
    t.integer "item_id", null: false
    t.integer "column_id", null: false
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["column_id"], name: "index_item_people_on_column_id"
    t.index ["item_id", "column_id"], name: "index_item_people_on_item_id_and_column_id", unique: true
    t.index ["item_id"], name: "index_item_people_on_item_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "item_name"
    t.integer "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_items_on_group_id"
  end

  create_table "statuses", force: :cascade do |t|
    t.integer "item_id", null: false
    t.integer "column_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["column_id"], name: "index_statuses_on_column_id"
    t.index ["item_id", "column_id"], name: "index_statuses_on_item_id_and_column_id", unique: true
    t.index ["item_id"], name: "index_statuses_on_item_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "full_name", null: false
    t.integer "account_id", null: false
    t.integer "owned_account_id"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id", "email"], name: "index_users_on_account_id_and_email", unique: true
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["email"], name: "index_users_on_email"
    t.index ["full_name"], name: "index_users_on_full_name"
    t.index ["owned_account_id"], name: "index_users_on_owned_account_id"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "workspace_members", force: :cascade do |t|
    t.integer "workspace_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "workspace_id"], name: "index_workspace_members_on_user_id_and_workspace_id", unique: true
    t.index ["user_id"], name: "index_workspace_members_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_members_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "workspace_name", null: false
    t.integer "workspace_owner_id", null: false
    t.integer "account_id", null: false
    t.text "board_ids", default: [], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_workspaces_on_account_id"
    t.index ["board_ids"], name: "index_workspaces_on_board_ids"
    t.index ["workspace_name"], name: "index_workspaces_on_workspace_name"
    t.index ["workspace_owner_id"], name: "index_workspaces_on_workspace_owner_id"
  end

end
