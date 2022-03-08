class CreateDueDates < ActiveRecord::Migration[5.2]
  def change
    create_table :due_dates do |t|
      t.integer :item_id, null: false
      t.integer :column_id, null: false
      t.date :date

      t.timestamps
    end

    add_index :due_dates, :item_id
    add_index :due_dates, :column_id
    add_index :due_dates, [:item_id, :column_id], unique: true
  end
end
