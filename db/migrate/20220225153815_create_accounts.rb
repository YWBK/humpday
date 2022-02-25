class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :account_name, null: false
      t.integer :account_owner_id, null: false

      t.timestamps
    end

    add_index :accounts, :account_name, unique: true
    add_index :accounts, :account_owner_id, unique: true
  end
end
