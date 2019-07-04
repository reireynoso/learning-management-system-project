class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.string :question
      t.string :answer
      t.integer :student_id 
      t.integer :problem_id
      t.integer :submission_id
      t.integer :points_assigned 

      t.timestamps
    end
  end
end
