class CreateWorkspaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workspaces do |t|
      t.string :workspace_name, null: false
      t.integer :workspace_owner_id, null: false
      t.integer :account_id, null: false
      t.text :board_ids, array: true, default: [], null: false

      t.timestamps
    end

    add_index :workspaces, :workspace_name
    add_index :workspaces, :workspace_owner_id
    add_index :workspaces, :account_id
    add_index :workspaces, :board_ids
  end
end
