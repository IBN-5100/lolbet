import { Card, Title, Text, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '@tremor/react';
import Link from 'next/link'; // Use Link for client-side navigation

interface Player {
  id: number;
  username: string;
  points: number;
  delta: number;
  status: string;
}

export default async function IndexPage({players}) {

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
              <TableRow key={player.id}>
                <TableCell>
                  <Link href={`/player?id=${player.id}`}>
                    <a>{player.username}</a>
                  </Link>
                </TableCell>
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
