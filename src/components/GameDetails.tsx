import { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import getRPSContract from "../../contract/RPSContract";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { Card, CardBody } from "@nextui-org/react";

const GameDetails = () => {
  const { deployedGameAddress } = useParams();
  const [selectedMove, setSelectedMove] = useState("0");
  const [stake, setStake] = useState("0");

  const handleMoveChange = (e) => {
    setSelectedMove(e.target.value);
  };

  const resetValues = () => {
    setSelectedMove("0");
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
  }, [deployedGameAddress]);

  const handlePlay = async () => {
    if (selectedMove !== "0" && ethers.isAddress(deployedGameAddress)) {
      try {
        const RPSContract = await getRPSContract(deployedGameAddress);
        await RPSContract.play(selectedMove, {
          value: ethers.parseEther(stake),
        });
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
      <Select
        items={moves}
        label="Player-2 move"
        placeholder="Select a move"
        className="w-80"
        isRequired
        selectedKeys={selectedMove}
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
  );
};

export default GameDetails;
