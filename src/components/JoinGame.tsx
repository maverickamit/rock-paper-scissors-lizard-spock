import { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import getRPSContract from "../../contract/RPSContract";

const JoinGame = () => {
  const [selectedMove, setSelectedMove] = useState("0");
  const [deployedGameAddress, setdeployedGameAddress] = useState(""); //

  const handleMoveChange = (e) => {
    setSelectedMove(e.target.value);
  };

  const resetValues = () => {
    setSelectedMove("0");
    setdeployedGameAddress("");
  };

  const handleJoinGame = async () => {
    if (selectedMove !== "0" && deployedGameAddress) {
      try {
        const RPSContract = await getRPSContract(deployedGameAddress);
        const stake = await RPSContract.stake();
        await RPSContract.play(selectedMove, { value: stake });
        resetValues();

        console.log("success");
      } catch (e) {
        console.log("error", e);
      }
    }
  };
  const moves = [
    {
      label: "Select a move",
      value: "0",
    },
    {
      label: "Rock",
      value: "1",
    },
    {
      label: "Paper",
      value: "2",
    },
    {
      label: "Scissors",
      value: "3",
    },
    {
      label: "Lizard",
      value: "4",
    },
    {
      label: "Spock",
      value: "5",
    },
  ];
  return (
    <div className="flex justify-center items-center mt-20">
      <Input
        className="w-80 mr-5"
        type="text"
        label="Deployed Game Address"
        placeholder="Enter the address of the game"
        value={deployedGameAddress}
        onChange={(e) => setdeployedGameAddress(e.target.value)}
        isRequired
      />
      <Select
        items={moves}
        label="Your move"
        placeholder="Select a move"
        className="w-80"
        isRequired
        selectedKeys={selectedMove}
        onChange={handleMoveChange}
      >
        {(move) => <SelectItem key={move.value}>{move.label}</SelectItem>}
      </Select>
      <Button className="ml-8" color="primary" onClick={handleJoinGame}>
        Join
      </Button>
    </div>
  );
};

export default JoinGame;
