class CreateCoreModels < ActiveRecord::Migration[7.0]
  def change
    create_table :coaches, id: :string do |t|
      t.string :name, null: false
      t.string :phone_number, null: false
      t.timestamps
    end

    create_table :students, id: :string do |t|
      t.string :name, null: false
      t.string :phone_number, null: false
      t.timestamps
    end

    create_table :slots, id: :string do |t|
      t.references :coach, null: false, foreign_key: true, type: :string
      t.references :student, foreign_key: true, type: :string
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.timestamps
    end

    create_table :calls, id: :string do |t|
      t.references :student, foreign_key: true, type: :string
      t.references :slot, foreign_key: true, type: :string
      t.integer :score
      t.string :notes
      t.timestamps
    end
  end
end
