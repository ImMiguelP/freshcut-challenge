import { Flex, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { Replies, ReplyLikes, User } from "@prisma/client";
import moment from "moment";
import React, { useEffect, useState } from "react";

function Replys({
  replies,
  user,
  handleFocus,
}: {
  replies: Replies & {
    ReplyLikes: ReplyLikes[];
    author: User;
  };
  user: User;
  handleFocus: any;
}) {
  const [reply, setReply] = useState(replies);
  const likes = reply.ReplyLikes;
  console.log(reply, likes);

  useEffect(() => {
    replyData();
  }, []);

  // Replies Data
  const replyData = async () => {
    const res = await fetch(`/api/comments/replies/replyData`, {
      method: "POST",
      body: reply.id,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setReply(data);
  };

  // Like Reply
  const likeComment = async () => {
    const res = await fetch(`api/comments/replies/like`, {
      method: "POST",
      body: JSON.stringify({
        authorId: user.id,
        replyId: reply.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    replyData();
  };

  // Dislike Reply
  const dislikeComment = async () => {
    const res = await fetch(`api/comments/replies/dislike`, {
      method: "POST",
      body: JSON.stringify({
        authorId: user.id,
        replyId: reply.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    replyData();
  };

  return (
    <HStack pl={"32px"} w={"100%"} align={"self-start"}>
      <Image boxSize={"20px"} src={"/assests/avatars/avatar.png"} />
      <Flex flexDirection={"column"} w={"180px"} maxW={"180px"}>
        <Text>{reply.author.username}</Text>
        <Text color={"#A19DAA"}>{reply.message}</Text>
        <HStack fontSize={"11px"} pt={"1px"}>
          <Text color={"#A19DAA"}>{moment(reply.createdAt).fromNow()}</Text>
          <Text
            cursor={"pointer"}
            fontWeight={"700"}
            onClick={() => handleFocus(reply.commentId, reply.author.username)}
          >
            Reply
          </Text>
        </HStack>
      </Flex>
      <Flex flexDirection={"column"}>
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
            icon={
              <Image
                w={"16px"}
                cursor={"pointer"}
                src={"/assests/UnfilledHeart.svg"}
                onClick={likeComment}
              />
            }
          />
        )}

        <Text textAlign={"center"}>{reply.ReplyLikes.length}</Text>
      </Flex>
    </HStack>
  );
}

export default Replys;
