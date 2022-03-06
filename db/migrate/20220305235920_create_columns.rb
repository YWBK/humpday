class CreateColumns < ActiveRecord::Migration[5.2]
  def change
    create_table :columns do |t|
      t.string :column_name, default: 'Item', null: false
      t.string :column_type, default: 'item', null: false
      t.integer :board_id, null: false

      t.timestamps
    end

    add_index :columns, :board_id
  end
end
