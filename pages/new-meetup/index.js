import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router"
const NewMeetUp = () => {
  const router = useRouter();
  const onAddMeetup = async (meetupData) => {
    console.log(meetupData);
    const result = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    console.log(response);
    router.push("/");
  };
  return <NewMeetupForm onAddMeetup={onAddMeetup} />;
};
export default NewMeetUp;
