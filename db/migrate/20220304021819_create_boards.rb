class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :board_name, null: false
      t.integer :workspace_id, null: false
      t.integer :board_owner_id, null: false
      t.integer :board_permissions, default: 4
      t.text :column_ids, array: true, default: [], null: false
      t.text :group_ids, array: true, default: [], null: false

      t.timestamps
    end

    add_index :boards, :board_name
    add_index :boards, :workspace_id
    add_index :boards, :board_owner_id
    add_index :boards, :column_ids
    add_index :boards, :group_ids
  end
end
