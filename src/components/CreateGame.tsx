import { useState } from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import getHasherContract from "../../contract/HasherContract";
import getRPSContractFactory from "../../contract/RPSContractFactory";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const salt = import.meta.env.VITE_SALT;

const CreateGame = () => {
  const navigate = useNavigate();
  const [selectedMove, setSelectedMove] = useState("0");
  const [stakedAmount, setStakedAmount] = useState(0);
  const [player2Address, setPlayer2Address] = useState(""); //
  const [isLoading, setIsLoading] = useState(false);

  const handleMoveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMove(e.target.value);
  };

  const resetValues = () => {
    setSelectedMove("0");
    setPlayer2Address("");
    setStakedAmount(0);
  };

  const handleCreateGame = async () => {
    const hasherContract = await getHasherContract();
    const RPSContractFactory = await getRPSContractFactory();

    if (selectedMove !== "0" && player2Address && stakedAmount) {
      setIsLoading(true); //set loading to true
      try {
        const amountToStake = ethers.parseEther(stakedAmount.toString()); // Replace with the desired amount in Ether
        const address = ethers.getAddress(player2Address);
        const c1hash = await hasherContract.hash(selectedMove, salt);
        const RPSContract = await RPSContractFactory.deploy(c1hash, address, {
          value: amountToStake,
        });

        const deployedAddress = await RPSContract.getAddress();
        resetValues();
        await RPSContract.waitForDeployment();
        navigate("/game-details/" + deployedAddress);
      } catch (e) {
        console.log("error", e);
      }
      setIsLoading(false); //set loading to true
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
    <>
      <div className="flex justify-center items-center mt-20">
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
        <Input
          className="w-80 ml-5"
          type="text"
          label="Player 2 Address"
          placeholder="Enter your opponent's address"
          value={player2Address}
          onChange={(e) => setPlayer2Address(e.target.value)}
          isRequired
        />
        <Button
          className="ml-8"
          color="primary"
          onClick={handleCreateGame}
          isLoading={isLoading}
        >
          Create
        </Button>
      </div>
      <div className="mt-4 p-4 flex items-center justify-center">
        <Input
          className="w-1/3 ml-5"
          type="number"
          label="Stake amount"
          placeholder="Enter the amount to be staked in ETH"
          value={stakedAmount.toString()}
          onChange={(e) => setStakedAmount(parseFloat(e.target.value))}
          isRequired
        />
      </div>
    </>
  );
};

export default CreateGame;
