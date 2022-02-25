class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :full_name, null: false
      t.integer :account_id, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false

      t.timestamps
    end

    add_index :users, :email
    add_index :users, :full_name
    add_index :users, :account_id
    add_index :users, [:account_id, :email], unique: true
    add_index :users, :session_token, unique: true
  end
end
