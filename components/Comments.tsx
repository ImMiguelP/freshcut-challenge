import {
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Comment, CommentLikes, Replies, User } from "@prisma/client";
import Replys from "./Replys";

function Comments({
  comments,
  user,
  handleFocus,
}: {
  comments: Comment & {
    CommentLikes: CommentLikes[];
    author: User;
    Replies: Replies[];
  };
  user: User;
  handleFocus: any;
}) {
  const [comment, setComment] = useState(comments);
  const likes = comment.CommentLikes;

  useEffect(() => {
    commentData();
  }, []);

  // Fetch Comment Data

  const commentData = async () => {
    const res = await fetch(`/api/comments/commentData`, {
      method: "POST",
      body: comment.id,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setComment(data);
  };

  // Like Comment
  const likeComment = async () => {
    const res = await fetch(`api/comments/liked`, {
      method: "POST",
      body: JSON.stringify({
        authorId: user.id,
        commentId: comment.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    commentData();
  };

  // Dislike Comment
  const dislikeComment = async () => {
    const res = await fetch(`api/comments/disliked`, {
      method: "POST",
      body: JSON.stringify({
        authorId: user.id,
        commentId: comment.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    commentData();
  };

  return (
    // Comments Section
    <VStack fontSize={"12px"}>
      <HStack align={"self-start"}>
        <Image
          boxSize={"24px"}
          borderRadius={"1000px"}
          src={comment.author.avatar}
        />
        <Flex flexDirection={"column"} w={"218px"}>
          <Text fontWeight={"700"}>{comment.author.username}</Text>
          <Text fontWeight={"500"} color={"#A19DAA"}>
            {comment.message}
          </Text>
          <HStack fontSize={"11px"} pt={"1px"}>
            <Text color={"#A19DAA"}>{moment(comment.createdAt).fromNow()}</Text>
            <Text
              fontWeight={"700"}
              cursor={"pointer"}
              onClick={() => handleFocus(comment.id, comment.author.username)}
            >
              Reply
            </Text>
          </HStack>
        </Flex>
        <Flex flexDirection={"column"} align={"center"}>
          {likes.find((data: any) => data.authorId === user.id) ? (
            <IconButton
              aria-label="Search database"
              variant={""}
              onClick={dislikeComment}
              icon={
                <Image
                  w={"26px"}
                  cursor={"pointer"}
                  src={"/assests/Heart.svg"}
                  sx={{
                    filter: "drop-shadow(0px 2px 8px rgba(255, 255, 255, 0.4))",
                  }}
                />
              }
            />
          ) : (
            <IconButton
              aria-label="Search database"
              variant={""}
              onClick={likeComment}
              icon={
                <Image
                  w={"16px"}
                  cursor={"pointer"}
                  src={"/assests/UnfilledHeart.svg"}
                />
              }
            />
          )}
          <Text>{comment.CommentLikes.length}</Text>
        </Flex>
      </HStack>
      {/* Replies */}

      {comments.Replies.map((replies: any) => (
        <Replys replies={replies} user={user} handleFocus={handleFocus} />
      ))}
    </VStack>
  );
}

export default Comments;
