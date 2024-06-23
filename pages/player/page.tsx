import { Card, Title, Text } from '@tremor/react';
import { notFound } from 'next/navigation'; // Use to handle not found cases

interface Player {
  id: number;
  username: string;
  points: number;
  delta: number;
  status: string;
}

export default async function PlayerPage({ searchParams }: { searchParams: { id: string } }) {
  const id = searchParams.id;

  if (!id) {
    return <Text>Loading...</Text>;
  }

  const player = {
    username: "SuperFX",
    points: 123,
    delta: 1,
    status: "live"
  };

  if (!player) {
    notFound(); // Show a not found page if player is not found
    return;
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-3xl">
      <Card>
        <Title>Player Details</Title>
        <Text><strong>Username:</strong> {player.username}</Text>
        <Text><strong>Points:</strong> {player.points}</Text>
        <Text><strong>Delta:</strong> {player.delta}</Text>
        <Text><strong>Status:</strong> {player.status}</Text>
      </Card>
    </main>
  );
}
