import { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import getRPSContract from "../../contract/RPSContract";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { Card, CardBody } from "@nextui-org/react";

const salt = import.meta.env.VITE_SALT;

const GameDetails = () => {
  const { deployedGameAddress } = useParams();
  const [selectedMoveP1, setSelectedMoveP1] = useState("0");
  const [selectedMoveP2, setSelectedMoveP2] = useState("0");

  const [stake, setStake] = useState("0");

  const handleMoveChange = (e) => {
    if (e.target.name == "player1") setSelectedMoveP1(e.target.value);
    if (e.target.name == "player2") setSelectedMoveP2(e.target.value);
  };

  const resetValues = () => {
    setSelectedMoveP1("");
    setSelectedMoveP2("");
  };

  useEffect(() => {
    const fetchStakeAmount = async () => {
      if (deployedGameAddress) {
        try {
          const RPSContract = await getRPSContract(deployedGameAddress);
          const stake = await RPSContract.stake();
          setStake(ethers.formatEther(stake));
        } catch (e) {
          console.log("error", e);
        }
      }
    };
    fetchStakeAmount();
  });

  const handlePlay = async () => {
    if (selectedMoveP2 !== "0" && ethers.isAddress(deployedGameAddress)) {
      try {
        const RPSContract = await getRPSContract(deployedGameAddress);
        await RPSContract.play(selectedMoveP2, {
          value: ethers.parseEther(stake),
        });
        resetValues();

        console.log("success");
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const handleSolve = async () => {
    if (ethers.isAddress(deployedGameAddress) && parseInt(selectedMoveP1)) {
      try {
        const RPSContract = await getRPSContract(deployedGameAddress);
        await RPSContract.solve(parseInt(selectedMoveP1), salt);
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
    <>
      <div className="flex justify-center items-center mt-20">
        <Select
          items={moves}
          name="player2"
          label="Player-2 move"
          placeholder="Select a move"
          className="w-80"
          isRequired
          selectedKeys={selectedMoveP2}
          onChange={handleMoveChange}
        >
          {(move) => <SelectItem key={move.value}>{move.label}</SelectItem>}
        </Select>
        <Card className="w-80 ml-5 border" shadow="none" isDisabled>
          <CardBody>
            <p>{`Stake amount: ${stake} ETH`}</p>
          </CardBody>
        </Card>
        <Button className="ml-8" color="primary" onClick={handlePlay}>
          Play
        </Button>
      </div>
      <div className="mt-4 p-4 flex items-center justify-center">
        <Select
          items={moves}
          name="player1"
          label="Player-1 previous move"
          placeholder="Select the move player1 already played"
          className="w-80"
          isRequired
          selectedKeys={selectedMoveP1}
          onChange={handleMoveChange}
        >
          {(move) => <SelectItem key={move.value}>{move.label}</SelectItem>}
        </Select>
        <Button className="ml-8 " color="primary" onClick={handleSolve}>
          Decide winner
        </Button>
      </div>
    </>
  );
};

export default GameDetails;
