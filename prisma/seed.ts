import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
  {
    username: "CreatorName",
    avatar: "/assests/avatars/avatar.png",
    bio: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit magna.",
    videos: {
      create: [
        {
          description:
            "Satoshi Nakamoto launched lots of decentralisation when Litecoin required many decentralised application #sniped #teamsolomid",
          videoUrl:
            "https://content.jwplatform.com/videos/Ho76GU89-zR83cUvz.mp4",
          videoGame: "Valorant",
        },
        {
          description:
            "Satoshi Nakamoto launched lots of decentralisation when Litecoin required many decentralised application #sniped #teamsolomid",
          videoUrl:
            "https://content.jwplatform.com/videos/BtpJORea-zR83cUvz.mp4",
          videoGame: "Valorant",
        },
      ],
    },
  },
  {
    username: "uhSnow",
    avatar: "/assests/avatars/uhSnow.png",
    comments: {
      create: [
        {
          message: "I remember when this first dropped!",
          video: { connect: { id: 1 } },
        },
        {
          message: "I remember when this first dropped!",
          video: { connect: { id: 2 } },
        },
      ],
    },
  },
  {
    username: "Maarble",
    avatar: "/assests/avatars/marble.png",
    comments: {
      create: [
        {
          message:
            "A comment is limited to two lines in the default view and when expanded you’ll be able to see the entire comment in full detail with more information.",
          video: { connect: { id: 1 } },
        },
        {
          message:
            "A comment is limited to two lines in the default view and when expanded you’ll be able to see the entire comment in full detail with more information.",
          video: { connect: { id: 2 } },
        },
      ],
    },
  },
  {
    username: "Ravs",
    avatar: "/assests/avatars/ravs.png",
    Replies: {
      create: [
        {
          message: "@PinkuSama example of a reply to a comment.",
          comment: { connect: { id: 4 } },
        },
        {
          message: "@PinkuSama example of a reply to a comment.",
          comment: { connect: { id: 3 } },
        },
      ],
    },
  },
  {
    username: "AnthonyZ",
    avatar: "/assests/avatars/anthonyz.png",
    comments: {
      create: [
        {
          message:
            "A comment is limited to two lines in the default view and when expanded you’ll be able to see the entire comment in full detail with more information.",
          video: { connect: { id: 1 } },
        },
        {
          message:
            "A comment is limited to two lines in the default view and when expanded you’ll be able to see the entire comment in full detail with more information.",
          video: { connect: { id: 2 } },
        },
      ],
    },
  },
];

const main = async () => {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);
