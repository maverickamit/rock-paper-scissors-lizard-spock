import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Landing = () => {
  const handleOnClick = () => {};

  return (
    <div className="flex justify-center">
      <Link to={"create-game"}>
        <Button className="m-5" color="success" onClick={handleOnClick}>
          Create a new game
        </Button>
      </Link>
      <Button className="m-5" color="secondary">
        Join a game
      </Button>
    </div>
  );
};

export default Landing;
