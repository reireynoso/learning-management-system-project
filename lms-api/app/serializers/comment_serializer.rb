class CommentSerializer < ActiveModel::Serializer
  belongs_to :commentable
  belongs_to :announcement
  attributes :id, :commentable, :content

end
