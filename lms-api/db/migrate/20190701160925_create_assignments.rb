class CreateAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :assignments do |t|
      t.string :name
      t.string :note
      t.integer :course_id
      t.datetime :due_date
      
      t.timestamps
    end
  end
end
