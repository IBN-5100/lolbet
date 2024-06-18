import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import { useSearchParams } from 'next/navigation';  // Correct import for server components

interface Player {
  id: number;
  username: string;
  points: number;
  delta: number;
  status: string;
}

export default async function PlayerPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) {
    return <Text>Loading...</Text>;
  }

  const result = await sql`
    SELECT id, username, points, delta, status 
    FROM players 
    WHERE id = ${id};
  `;
  const player = result.rows[0] as Player;

  if (!player) {
    return <Text>No player found</Text>;
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
