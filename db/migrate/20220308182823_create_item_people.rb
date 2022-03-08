class CreateItemPeople < ActiveRecord::Migration[5.2]
  def change
    create_table :item_people do |t|
      t.integer :item_id, null: false
      t.integer :column_id, null: false
      t.integer :user_id

      t.timestamps
    end

    add_index :item_people, :item_id
    add_index :item_people, :column_id
    add_index :item_people, [:item_id, :column_id], unique: true

  end
end
