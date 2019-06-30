class AnnouncementSerializer < ActiveModel::Serializer
  attributes :id, :title, :information, :video_url
end
