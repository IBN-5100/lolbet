import { sql } from '@vercel/postgres';
import { Card, Title, Text, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '@tremor/react';
import { useRouter } from 'next/navigation';  // Correct import for server components

interface Player {
  id: number;
  username: string;
  points: number;
  delta: number;
  status: string;
}

export default async function IndexPage() {
  const result = await sql`
    SELECT id, username, points, delta, status 
    FROM players;
  `;
  const players = result.rows as Player[];
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/player?id=${id}`);
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>League of Legends Players</Title>
      <Text>View the leaderboard and click to see detailed stats.</Text>
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Username</TableHeaderCell>
              <TableHeaderCell>Points</TableHeaderCell>
              <TableHeaderCell>Delta</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(player => (
              <TableRow key={player.id} onClick={() => handleRowClick(player.id)} className="cursor-pointer">
                <TableCell>{player.username}</TableCell>
                <TableCell>{player.points}</TableCell>
                <TableCell>{player.delta}</TableCell>
                <TableCell>{player.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
