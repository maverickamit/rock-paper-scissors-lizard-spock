import { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import getHasherContract from "../../contract/HasherContract";
import getRPSContractFactory from "../../contract/RPSContractFactory";

const salt = import.meta.env.VITE_SALT;

const CreateGame = () => {
  const [selectedMove, setSelectedMove] = useState("0");
  const [player2Address, setPlayer2Address] = useState(""); //

  const handleMoveChange = (e) => {
    setSelectedMove(e.target.value);
  };

  const resetValues = () => {
    setSelectedMove("0");
    setPlayer2Address("");
  };

  const handleCreateGame = async () => {
    const hasherContract = await getHasherContract();
    const RPSContractFactory = await getRPSContractFactory();

    if (selectedMove !== "0" && player2Address) {
      try {
        const c1hash = await hasherContract.hash(1, salt);
        const RPSContract = await RPSContractFactory.deploy(
          c1hash,
          player2Address
        );
        const address = await RPSContract.getAddress();
        resetValues();

        console.log("deployed at ", address);
      } catch (e) {
        console.log("error", e);
      }
    }
    console.log("Selected Move:", selectedMove);
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
      <Select
        items={moves}
        label="Your move"
        placeholder="Select a move"
        className="max-w-xs"
        isRequired
        selectedKeys={selectedMove}
        onChange={handleMoveChange}
      >
        {(move) => <SelectItem key={move.value}>{move.label}</SelectItem>}
      </Select>
      <Input
        className="w-80 ml-5"
        type="text"
        label="Player 2 Address"
        placeholder="Enter your opponent's address"
        value={player2Address}
        onChange={(e) => setPlayer2Address(e.target.value)}
        isRequired
      />
      <Button className="ml-8" color="primary" onClick={handleCreateGame}>
        Create
      </Button>
    </div>
  );
};

export default CreateGame;
