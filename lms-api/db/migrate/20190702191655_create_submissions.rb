class CreateSubmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :submissions do |t|
      t.datetime :date_submitted 
      t.integer :grade_assigned
      t.integer :assignment_id 
      t.integer :student_id

      t.timestamps
    end
  end
end
