import { useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";

const CreateGame = () => {
  const [selectedMove, setSelectedMove] = useState("1"); // Default value is Rock (1)

  const handleMoveChange = (e) => {
    setSelectedMove(e.target.value);
  };

  const handleCreateGame = () => {
    console.log("Selected Move:", selectedMove);
  };
  const moves = [
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
    <div className="flex justify-center items-center">
      <Select
        items={moves}
        label="Your move"
        placeholder="Select a move"
        className="max-w-xs"
        isRequired
        onChange={handleMoveChange}
      >
        {(move) => <SelectItem key={move.value}>{move.label}</SelectItem>}
      </Select>
      <Button className="ml-8" color="primary" onClick={handleCreateGame}>
        Create
      </Button>
    </div>
  );
};

export default CreateGame;
