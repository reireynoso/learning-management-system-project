class Announcement < ApplicationRecord
    belongs_to :course
    has_many :comments, :dependent => :delete_all
end
