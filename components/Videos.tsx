import {
  AspectRatio,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import React, { useEffect, useState, useRef } from "react";
import Comments from "./Comments";
import { AiOutlineSend } from "react-icons/ai";
import { User, Video, VideoLikes } from "@prisma/client";

function Videos({
  video,
  user,
}: {
  video: Video & { VideoLikes: VideoLikes[]; author: User };
  user: User;
}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [videos, setVideos] = useState(video);
  const [inputFocus, setInputFocus] = useState(false);
  const likes = videos.VideoLikes;
  const inputRef = useRef<HTMLInputElement>(null);
  const [reply, setReply] = useState();

  useEffect(() => {
    fetchVideoData();
  }, []);

  const handleFocus = (c: any, r: any) => {
    setReply(c);
    setComment("@" + r + "");

    inputRef.current?.focus();
  };

  // Function to Fetch Video Data and Comments to map
  const fetchVideoData = async () => {
    const res = await fetch(`/api/video`, {
      method: "POST",
      body: videos.id,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setVideos(data);
    // Sets the  Comments
    setComments(data.comment);
    setComment("");
  };

  //  Function to send a comment
  const sendComment = async () => {
    const res = await fetch(`/api/comments/comment`, {
      method: "POST",
      body: JSON.stringify({
        message: comment,
        videoId: videos.id,
        authorId: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    fetchVideoData();
  };

  // Function to send a reply to a comment
  const sendTest = async () => {
    const res = await fetch(`/api/comments/replies/reply`, {
      method: "POST",
      body: JSON.stringify({
        message: comment,
        commentId: reply,
        authorId: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    fetchVideoData();
  };

  // Function to like video
  const likeVideo = async () => {
    const res = await fetch(`/api/videoliked`, {
      method: "POST",
      body: JSON.stringify({
        authorId: user.id,
        videoId: videos.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    fetchVideoData();
  };

  // Function to dislike video
  const dislikeVideo = async () => {
    const res = await fetch(`/api/videodisliked`, {
      method: "POST",
      body: JSON.stringify({
        authorId: user.id,
        videoId: videos.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    fetchVideoData();
  };

  return (
    // Video Section
    <Flex h={"581px"} borderRadius={"8px"}>
      <AspectRatio w={"1030px"}>
        <video style={{ borderRadius: "8px 0 0 8px" }} loop controls muted>
          <source src={videos.videoUrl} type="video/mp4" />
        </video>
      </AspectRatio>
      {/* Sidebar Comments */}
      <VStack
        w={"306px"}
        pt={"6px"}
        bgColor={"#151417"}
        borderRadius={"0 8px  8px 0"}
      >
        {/* Video Info */}
        <HStack
          h={"116px"}
          w={"100%"}
          padding={"0px 4px 12px 16px"}
          alignItems={"flex-start"}
          color={"white"}
          gap={"12px"}
        >
          <Image
            boxSize={"40px"}
            borderRadius={"20px"}
            src={videos.author.avatar}
          />
          {/* Title metadata */}
          <Stack w={"100%"} h={"104px"} gap={"4px"}>
            <HStack h={"16px"} mb={"-2"}>
              <Text fontSize={"12px"} fontWeight={"700"}>
                {videos.author.username}
              </Text>
              <Image boxSize={"16px"} src={"assests/Checkmark.svg"} />
            </HStack>
            <Text h={"64px"} fontSize={"12px"} fontWeight={"500"}>
              {videos.description}
            </Text>
            <HStack>
              <Image src={"assests/Gameplaying.svg"} />
              <Text fontSize={"12px"} color={"#A19DAA"}>
                {videos.videoGame}
              </Text>
            </HStack>
          </Stack>
        </HStack>
        {/* Menu Divider */}
        <Divider h={"1px"} bg={"#28262C"} />
        {/* Comments Section */}
        <Stack w={"100%"} h={"384px"} maxH={"384px"} color={"white"}>
          {/* Number of Total Comments */}
          <HStack alignSelf={"center"} w={"274px"} gap={"2px"}>
            <Text fontSize={"12px"} fontWeight={"500"}>
              Comments
            </Text>
            <Text fontSize={"12px"} color={"#8C8797"}>
              {comments.length}
            </Text>
          </HStack>
          {/* Comments */}
          <Stack
            w={"274px"}
            alignSelf={"center"}
            h={"100%"}
            overflowY={"scroll"}
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {comments.map((comments) => (
              <Comments
                comments={comments}
                user={user}
                handleFocus={handleFocus}
              />
            ))}
          </Stack>
        </Stack>
        <HStack>
          <InputGroup>
            <Input
              ref={inputRef}
              w={inputFocus ? "286px" : "186px"}
              borderRadius={"20px"}
              bgColor={"#28262C"}
              color={"white"}
              focusBorderColor={"#a98d27"}
              border={"none"}
              fontSize={"12px"}
              placeholder={"Add a comment..."}
              value={comment}
              css={{
                "&::placeholder": {
                  color: "#A19DAA",
                  fontSize: "12px",
                },
              }}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") reply ? sendTest() : sendComment();
              }}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
            {comment.length > 0 && (
              <InputRightElement w="50px" pr="5px">
                <IconButton
                  variant=""
                  aria-label="send"
                  onClick={reply ? sendTest : sendComment}
                  icon={<AiOutlineSend color={"white"} />}
                />
              </InputRightElement>
            )}
          </InputGroup>
          {!inputFocus && (
            <>
              <IconButton
                aria-label="share"
                variant={""}
                borderRadius={"2px"}
                icon={
                  <Stack spacing={"3px"}>
                    <Image cursor={"pointer"} src="/assests/Share.svg" />
                    <Text fontSize={"12px"} color={"#A19DAA"}>
                      12
                    </Text>
                  </Stack>
                }
              />

              {likes.find((data: VideoLikes) => data.authorId === user.id) ? (
                <IconButton
                  aria-label="dislike"
                  variant={""}
                  borderRadius={"2px"}
                  icon={
                    <Stack spacing={"-7px"}>
                      <Image
                        mt={-1.5}
                        w={"40px"}
                        cursor={"pointer"}
                        src="/assests/Heart.svg"
                        onClick={dislikeVideo}
                        sx={{
                          filter:
                            "drop-shadow(0px 2px 8px rgba(255, 255, 255, 0.4))",
                        }}
                      />
                      <Text fontSize={"12px"} color={"#A19DAA"}>
                        {videos.VideoLikes?.length}
                      </Text>
                    </Stack>
                  }
                />
              ) : (
                <Flex flexDirection={"column"} align="center">
                  <IconButton
                    aria-label="like"
                    variant={""}
                    borderRadius={"2px"}
                    icon={
                      <Stack spacing={"2px"}>
                        <Image
                          w={"24px"}
                          cursor={"pointer"}
                          src="/assests/UnfilledHeart.svg"
                          onClick={likeVideo}
                        />
                        <Text fontSize={"12px"} color={"#A19DAA"}>
                          {videos.VideoLikes?.length}
                        </Text>
                      </Stack>
                    }
                  />
                </Flex>
              )}
            </>
          )}
        </HStack>
      </VStack>
    </Flex>
  );
}

export default Videos;
