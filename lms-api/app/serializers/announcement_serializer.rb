class AnnouncementSerializer < ActiveModel::Serializer
  has_many :comments
  attributes :id, :title, :information, :video_url, :comments

end
