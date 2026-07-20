import { useGetUploadVideoQuery } from "@/redux/features/player/UploadVideo";

const ExplorePlayers = () => {
    const { data} = useGetUploadVideoQuery({
        page: 1,
        limit: 62,
      });
      console.log(data)
 return (
 <div>
 <h2>Welcome to the ExplorePlayers page</h2>
 </div>
 );
};

export default ExplorePlayers;