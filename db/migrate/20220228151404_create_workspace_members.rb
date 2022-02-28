class CreateWorkspaceMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :workspace_members do |t|
      t.integer :workspace_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :workspace_members, :workspace_id
    add_index :workspace_members, :user_id
    add_index :workspace_members, [:user_id, :workspace_id], unique: true
  end
end
