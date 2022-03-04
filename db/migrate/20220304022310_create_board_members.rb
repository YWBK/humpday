class CreateBoardMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :board_members do |t|
      t.integer :board_id, null: false
      t.integer :user_id, null: false

      t.timestamps

    end
    
    add_index :board_members, :board_id
    add_index :board_members, :user_id
    add_index :board_members, [:user_id, :board_id], unique: true
  end
end
