import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Profile({
  profile,
  user,
}: {
  profile: User & { followedBy: User[] };
  user: User;
}) {
  const [userProfile, setUserProfile] = useState(profile);
  const [likes, setLikes] = useState<any>();

  console.log(user, likes, userProfile);

  // Fetch Total Video Likes
  useEffect(() => {
    const fetchTotalLikes = async () => {
      const res = await fetch(`/api/users/videoLikes`);
      const data = await res.json();
      setLikes(data);
    };
    fetchTotalLikes();
  }, []);

  // Fetch Profile New Data
  const fetchProfileData = async () => {
    const res = await fetch(`/api/users/profileData`, {
      method: "POST",
      body: userProfile.id,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUserProfile(data);
  };

  // Follow  Profile
  const follow = async () => {
    const res = await fetch(`api/users/follow`, {
      method: "POST",
      body: JSON.stringify({
        follow: userProfile.id,
        followed: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    fetchProfileData();
  };

  // Unfollow Profile
  const unfollow = async () => {
    const res = await fetch(`api/users/unfollow`, {
      method: "POST",
      body: JSON.stringify({
        follow: userProfile.id,
        followed: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    fetchProfileData();
  };

  return (
    // Header
    <Flex
      flexDirection={"row"}
      alignItems={"flex-start"}
      w={"100%"}
      maxW={"1336px"}
      h={"288px"}
      background={
        "linear-gradient(180deg, rgba(21, 20, 23, 0.1) 0%, #151417 100%), url(https://freshcut.gg/feedBg.png), #151417;"
      }
      bgSize={"cover"}
      bgPosition={"50%"}
      borderRadius={"8px"}
      padding={"40px 48px"}
      gap={"8px"}
    >
      {/* Frame 362  */}
      <Stack gap={"24px"} w={"100%"}>
        {/* Frame 361 */}
        <HStack gap={"24px"} color="#FFFFFF">
          <Image
            boxSize={"128px"}
            borderRadius={"1000px"}
            src={"/assests/avatars/avatar.png"}
          />
          {/* Frame 360 */}
          <Stack>
            <HStack>
              <Heading fontSize={"34px"} lineHeight={"41px"}>
                {userProfile.username}
              </Heading>
              <Image src={"assests/Checkmark.svg"} />
            </HStack>
            <HStack>
              <Text>{userProfile.followedBy.length} followers</Text>
              <Text>12 Views</Text>
              <Text>{likes?.length} Likes</Text>
            </HStack>
            <Text w={"591px"}>{userProfile.bio}</Text>
          </Stack>
          <VStack w={"100%"} align={"end"}>
            {userProfile.followedBy.find((data: any) => data.id === user.id) ? (
              <Button
                bgColor={"#28262c"}
                p={"12px 24px"}
                borderRadius={"420px"}
                color={"white"}
                _hover={{ bg: "#3c3941" }}
                onClick={unfollow}
              >
                Following
              </Button>
            ) : (
              <Button
                bgColor={"#F2BC3D"}
                p={"12px 24px"}
                borderRadius={"420px"}
                color={"black"}
                _hover={{ bg: "#f7d78d" }}
                onClick={follow}
              >
                Follow
              </Button>
            )}
          </VStack>
        </HStack>
        <HStack gap={"18px"}>
          <Flex
            boxSize={"48px"}
            bg={"#151417"}
            borderRadius={"32px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link href={"https://discord.com/"}>
              <Image
                border={"1px"}
                cursor={"pointer"}
                boxSize={"24px"}
                src={"assests/Discord.svg"}
              />
            </Link>
          </Flex>
          <Flex
            boxSize={"48px"}
            bg={"#151417"}
            borderRadius={"32px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link href={"https://www.twitch.tv/"}>
              <Image
                cursor={"pointer"}
                boxSize={"24px"}
                src={"assests/Twitch.svg"}
              />
            </Link>
          </Flex>
          <Flex
            boxSize={"48px"}
            bg={"#151417"}
            borderRadius={"32px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link href={"https://www.youtube.com/"}>
              <Image
                cursor={"pointer"}
                boxSize={"24px"}
                src={"assests/Yt.svg"}
              />
            </Link>
          </Flex>
          <Flex
            boxSize={"48px"}
            bg={"#151417"}
            borderRadius={"32px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link href={"https://www.instagram.com/"}>
              <Image
                cursor={"pointer"}
                boxSize={"24px"}
                src={"assests/Ig.svg"}
              />
            </Link>
          </Flex>
        </HStack>
      </Stack>
    </Flex>
  );
}

export default Profile;
