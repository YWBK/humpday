class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :group_name, default: 'New Group', null: false
      t.string :group_color, null: false
      t.integer :board_id, null: false
      t.text :item_ids, array: true, default: [], null: false

      t.timestamps
    end

    add_index :groups, :board_id
    add_index :groups, :item_ids
  end
end
