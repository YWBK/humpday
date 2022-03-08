class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :item_name
      t.integer :group_id, null: false

      t.timestamps
    end

    add_index :items, :group_id
  end
end
