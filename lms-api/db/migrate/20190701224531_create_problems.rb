class CreateProblems < ActiveRecord::Migration[5.2]
  def change
    create_table :problems do |t|
      t.string :question
      t.integer :assignment_id

      t.timestamps
    end
  end
end
