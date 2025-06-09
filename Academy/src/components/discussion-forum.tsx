import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Textarea, 
  Avatar, 
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

interface DiscussionForumProps {
  title: string;
  comments: Comment[];
  onAddComment?: (content: string) => void;
  onAddReply?: (commentId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
}

export const DiscussionForum: React.FC<DiscussionForumProps> = ({
  title,
  comments: initialComments,
  onAddComment,
  onAddReply,
  onLikeComment,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // In a real app, this would be handled by the onAddComment callback
    // For demo purposes, we'll update the local state
    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      userId: "current-user",
      userName: "You",
      userAvatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
    
    if (onAddComment) {
      onAddComment(newComment);
    }
  };

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    // In a real app, this would be handled by the onAddReply callback
    // For demo purposes, we'll update the local state
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `reply-${Date.now()}`,
              userId: "current-user",
              userName: "You",
              userAvatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
              content: replyContent,
              timestamp: new Date().toISOString(),
              likes: 0,
              replies: [],
            },
          ],
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent("");
    
    if (onAddReply) {
      onAddReply(commentId, replyContent);
    }
  };

  const handleLikeComment = (commentId: string) => {
    // In a real app, this would be handled by the onLikeComment callback
    // For demo purposes, we'll update the local state
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    
    if (onLikeComment) {
      onLikeComment(commentId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <Divider />
      <CardBody className="p-4 space-y-6">
        {/* Comment Input */}
        <div className="flex gap-3">
          <Avatar
            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
            size="sm"
          />
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onValueChange={setNewComment}
              minRows={2}
              className="mb-2"
            />
            <div className="flex justify-end">
              <Button
                color="primary"
                size="sm"
                onPress={handleAddComment}
                isDisabled={!newComment.trim()}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-6 text-default-500">
              <Icon icon="lucide:message-circle" className="mx-auto mb-2" width={24} />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-4">
                <div className="flex gap-3">
                  <Avatar
                    src={comment.userAvatar}
                    size="sm"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{comment.userName}</span>
                        <span className="text-xs text-default-500 ml-2">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                          >
                            <Icon icon="lucide:more-horizontal" width={16} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Comment actions">
                          <DropdownItem startContent={<Icon icon="lucide:flag" width={16} />}>
                            Report
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                    <div className="flex gap-4 mt-2">
                      <Button
                        size="sm"
                        variant="light"
                        startContent={
                          <Icon 
                            icon={comment.isLiked ? "lucide:heart-filled" : "lucide:heart"} 
                            width={16}
                            className={comment.isLiked ? "text-danger" : ""}
                          />
                        }
                        onPress={() => handleLikeComment(comment.id)}
                      >
                        {comment.likes} {comment.likes === 1 ? "Like" : "Likes"}
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        startContent={<Icon icon="lucide:message-circle" width={16} />}
                        onPress={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      >
                        Reply
                      </Button>
                    </div>

                    {/* Reply Input */}
                    {replyingTo === comment.id && (
                      <div className="mt-3 ml-6">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyContent}
                          onValueChange={setReplyContent}
                          minRows={2}
                          className="mb-2"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="primary"
                            size="sm"
                            onPress={() => handleAddReply(comment.id)}
                            isDisabled={!replyContent.trim()}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 ml-6 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar
                              src={reply.userAvatar}
                              size="sm"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-medium">{reply.userName}</span>
                                  <span className="text-xs text-default-500 ml-2">
                                    {formatDate(reply.timestamp)}
                                  </span>
                                </div>
                              </div>
                              <p className="mt-1 text-sm">{reply.content}</p>
                              <div className="flex gap-4 mt-2">
                                <Button
                                  size="sm"
                                  variant="light"
                                  startContent={
                                    <Icon 
                                      icon={reply.isLiked ? "lucide:heart-filled" : "lucide:heart"} 
                                      width={16}
                                      className={reply.isLiked ? "text-danger" : ""}
                                    />
                                  }
                                  onPress={() => handleLikeComment(reply.id)}
                                >
                                  {reply.likes} {reply.likes === 1 ? "Like" : "Likes"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardBody>
    </Card>
  );
};