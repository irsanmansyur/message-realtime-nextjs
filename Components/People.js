import TopbarUser from "./Chat/TopbarUser";
import ListUser from "./people/ListUser";
const People = () => {
  return (
    <div className="people px-4">
      <TopbarUser />   <hr className="border border-gray-100 my-5" />
      <ListUser />
    </div>
  );
};

export default People;