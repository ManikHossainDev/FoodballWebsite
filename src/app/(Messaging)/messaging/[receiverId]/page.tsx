/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
import Message from "@/components/Pages/messaging/messaging";
// router.push(`/messaging/${user.id}`);
const page = async ({ params }:any) => {
  const { receiverId } = await params;
  return <Message receiverId={receiverId} />;
};

export default page;
