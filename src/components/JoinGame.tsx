import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const JoinGame = () => {
  const navigate = useNavigate();

  const [deployedGameAddress, setdeployedGameAddress] = useState(""); //

  const resetValues = () => {
    setdeployedGameAddress("");
  };

  const handleJoinGame = () => {
    if (ethers.isAddress(deployedGameAddress)) {
      navigate("/game-details/" + deployedGameAddress);
    }
    resetValues();
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Input
        className="w-80 mr-5"
        type="text"
        label="Deployed Game Address"
        placeholder="Enter the address of the game"
        value={deployedGameAddress}
        onChange={(e) => setdeployedGameAddress(e.currentTarget.value)}
        isRequired
      />
      <Button className="ml-8" color="primary" onClick={handleJoinGame}>
        Join
      </Button>
    </div>
  );
};

export default JoinGame;
