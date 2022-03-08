class CreateStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :statuses do |t|
      t.integer :item_id, null: false
      t.integer :column_id, null: false
      t.string :status

      t.timestamps
    end

    add_index :statuses, :item_id
    add_index :statuses, :column_id
    add_index :statuses, [:item_id, :column_id], unique: true
  end
end
