import { Button } from "@/components/ui";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
	return (
		<div className="flex flex-col">
			<p className="text-3xl font-bold text-indigo-500">Hello Discord Clone</p>
			<Button variant="gradient">Click Me</Button>
		</div>
	);
};

export default HomePage;
