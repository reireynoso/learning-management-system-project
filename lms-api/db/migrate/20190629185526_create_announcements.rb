class CreateAnnouncements < ActiveRecord::Migration[5.2]
  def change
    create_table :announcements do |t|
      t.string :title
      t.string :information
      t.string :video_url
      t.integer :course_id

      t.timestamps
    end
  end
end
